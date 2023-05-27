/**
 * This AudioWorklet gets loaded by the dtmf.ts utility.
 * It runs like a WebWorker in its own thread and communicates via messaging.
 */

const COL = [1209, 1336, 1477, 1633];
const ROW = [697, 770, 852, 941];
const LETTERS = "123A456B789C*0#D".split('');

const LETTER_HISTORY = 10;
const MAGNITUDE_EPSILON = 0.05;
const MIN_SAMPLES = 512;

class DtfmProcessor extends AudioWorkletProcessor {

    constructor() {
        super();

        this.allFreqs = [...ROW, ...COL];
        this.lastLetter = null;
        this.letterHistory = [];

        this.sampleCollector = new Float32Array(MIN_SAMPLES * 2);
        this.sampleCount = 0;
    }

    process(inputs, _outputs, _parameters) {
        // We only get 128 samples per call. This isn't enough to 
        // calculate the right frequencies.
        // The solution is to collect enough samples before running
        // the algorithm.

        for (let i = 0; i < inputs[0][0].length; i++) {
            this.sampleCollector[this.sampleCount] = inputs[0][0][i];
            this.sampleCount++;
        }

        if (this.sampleCount < MIN_SAMPLES) {
            return true;
        }

        // Get the most likely letter.
        const mags = this.allFreqs.map(freq => {
            // eslint-disable-next-line no-undef
            return this.goertzelMag(freq, sampleRate, this.sampleCollector, this.sampleCount);
        });

        const letter = this.frequenciesToDtmf(mags);
        const newLen = this.letterHistory.push(letter);
        if (newLen > LETTER_HISTORY) {
            this.letterHistory.splice(0, 1);
        }

        if (this.letterHistory.every((x) => x === this.letterHistory[0]) &&
            this.letterHistory[0] !== this.lastLetter) {
            
            this.lastLetter = letter;
            this.port.postMessage(letter);
        }

        this.sampleCount = 0;

        return true;
    }

    /**
     * Calculates the magnitude of a target frequency in some samples using the
     * Goertzel Algorithm.
     * 
     * @param freq the target frequency
     * @param sampleRate the sample rate
     * @param samples the actual samples
     * @param count the sample count
     * @returns the calculated magnitude
     */
    goertzelMag(freq, sampleRate, samples, count) {
        const k = Math.floor(0.5 + ((count * freq) / sampleRate));
        const omega = (2 * Math.PI * k) / count;
        const sine = Math.sin(omega);
        const cosine = Math.cos(omega);
        const coeff = cosine * 2;

        let q0 = 0;
        let q1 = 0;
        let q2 = 0;

        for (let i = 0; i < count; i++) {
            q0 = coeff * q1 - q2 + samples[i];
            q2 = q1;
            q1 = q0;
        }

        const real = (q1 - q2 * cosine);
        const imag = (q2 * sine);

        return Math.sqrt(real * real + imag * imag);
    }

    /**
     * Calculates the detected letter from 8 magnitudes.
     * 
     * @param freqs 8 magnitudes
     */
    frequenciesToDtmf(freqs) {
        const row = freqs.slice(0, 4).map((x, index) => ({ index, freq: ROW[index], mag: x }));
        const col = freqs.slice(4, 8).map((x, index) => ({ index, freq: COL[index], mag: x }));

        const highestRow = row.reduce((prev, cur) => prev.mag > cur.mag ? prev : cur);
        const highestCol = col.reduce((prev, cur) => prev.mag > cur.mag ? prev : cur);

        if (highestCol.mag < MAGNITUDE_EPSILON || highestRow.mag < MAGNITUDE_EPSILON) {
            return null;
        }

        const letterIndex = highestRow.index * 4 + highestCol.index;

        return LETTERS[letterIndex];
    }
}

registerProcessor('dtfm-processor', DtfmProcessor);
