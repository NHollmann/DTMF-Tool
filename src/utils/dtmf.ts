/**
 * This class is able to encode and output DTMF singals,
 * or to capture and decode them.
 */

const COL = [1209, 1336, 1477, 1633];
const ROW = [697, 770, 852, 941];
const LETTERS = "123A456B789C*0#D".split('');

const NUM_SAMPLES = 512;
const MAGNITUDE_EPSILON = 0.05;
const LETTER_HISTORY = 10;

export class DTMF {
    private context: AudioContext;
    private duration: number;
    private allFreqs: number[];
    private decodedMessage: string;
    private letterHistory: Array<string | null>;
    private lastLetter: string | null;

    /**
     * Initialises a new DTMF Encoder/Decoder.
     */
    constructor() {
        this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.duration = 0.2;
        this.allFreqs = [...ROW, ...COL];
        this.decodedMessage = "";
        this.letterHistory = [];
        this.lastLetter = null;
    }

    /**
     * Sets the new duration for a single note.
     * 
     * @param duration the new duration
     */
    setDuration(duration: number) {
        this.duration = duration;
    }

    /**
     * Getter for the decoded message.
     */
    getDecodedMessage(): string {
        return this.decodedMessage;
    }

    /**
     * Clears the decoded message.
     */
    clearDecodedMessage() {
        this.decodedMessage = "";
    }

    /**
     * Plays a single note.
     * A note can be a digit from 0 to 9, *, #, or the letters from A to D.
     * 
     * @param sym the note to play
     */
    playNote(sym: string) {
        const index = LETTERS.findIndex(x => x === sym);
        if (index >= 0) {
            const col = index % COL.length;
            const row = Math.floor(index / COL.length);

            this.play(COL[col], ROW[row]);
        }
    }

    /**
     * Starts an audio recoding and decodes the incomming DTMF signals.
     * 
     * @param callback a callback that is fired when the input changes
     */
    captureDTMF(callback: (x: string | null) => void) {
        const handleSuccess = (stream: MediaStream) => {
            const source = this.context.createMediaStreamSource(stream);
            const processor = this.context.createScriptProcessor(NUM_SAMPLES, 1, 1);

            source.connect(processor);
            processor.connect(this.context.destination);

            processor.onaudioprocess = (e) => {

                const mags = this.allFreqs.map(freq => {
                    return this.goertzelMag(freq, e.inputBuffer.sampleRate, e.inputBuffer.getChannelData(0));
                });

                const letter = this.frequenciesToDtmf(mags);
                const newLen = this.letterHistory.push(letter);
                if (newLen > LETTER_HISTORY) {
                    this.letterHistory.splice(0, 1);
                }

                if (this.letterHistory.every((x) => x === this.letterHistory[0]) &&
                    this.letterHistory[0] !== this.lastLetter) {
                    
                    this.lastLetter = letter;
                    this.decodedMessage += letter || "";
                    callback(letter);
                }
            };
        };

        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(handleSuccess);
    }

    /**
     * This helper method plays a two-frequency note.
     * 
     * @param freq1 the first frequency
     * @param freq2 the second frequency
     */
    private play(freq1: number, freq2: number) {
        let osc1 = this.context.createOscillator();
        let osc2 = this.context.createOscillator();

        osc1.type = "sine";
        osc2.type = "sine";

        let gain1 = this.context.createGain();
        let gain2 = this.context.createGain();
        osc1.connect(gain1);
        gain1.connect(this.context.destination);
        gain1.gain.value = 0.1;
        gain1.gain.setTargetAtTime(0, this.context.currentTime + this.duration, 0.015);
        osc2.connect(gain2);
        gain2.connect(this.context.destination);
        gain2.gain.value = 0.1;
        gain2.gain.setTargetAtTime(0, this.context.currentTime + this.duration, 0.015);

        osc1.frequency.value = freq1;
        osc2.frequency.value = freq2;
        osc1.start();
        osc2.start();
        osc1.stop(this.context.currentTime + this.duration + 0.1);
        osc2.stop(this.context.currentTime + this.duration + 0.1);
    }

    /**
     * Calculates the magnitude of a target frequency in some samples using the
     * Goertzel Algorithm.
     * 
     * @param freq the target frequency
     * @param sampleRate the sample rate
     * @param samples the actual samples
     * @returns the calculated magnitude
     */
    private goertzelMag(freq: number, sampleRate: number, samples: Float32Array): number {
        const k = Math.floor(0.5 + ((NUM_SAMPLES * freq) / sampleRate));
        const omega = (2 * Math.PI * k) / NUM_SAMPLES;
        const sine = Math.sin(omega);
        const cosine = Math.cos(omega);
        const coeff = cosine * 2;

        let q0 = 0;
        let q1 = 0;
        let q2 = 0;

        for (let i = 0; i < NUM_SAMPLES; i++) {
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
    private frequenciesToDtmf(freqs: number[]): string | null {
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
};
