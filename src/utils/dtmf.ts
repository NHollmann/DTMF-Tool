/**
 * This class is able to encode and output DTMF singals,
 * or to capture and decode them.
 */

const COL = [1209, 1336, 1477, 1633];
const ROW = [697, 770, 852, 941];
const LETTERS = "123A456B789C*0#D".split('');

export class DTMF {
    private context: AudioContext;
    private duration: number;
    private decodedMessage: string;

    /**
     * Initialises a new DTMF Encoder/Decoder.
     */
    constructor() {
        this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.duration = 0.2;
        this.decodedMessage = "";
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
            
            this.context.audioWorklet.addModule(process.env.PUBLIC_URL + "/worklet/dtfm-processor.js").then(() => {
                const source = this.context.createMediaStreamSource(stream);
                const dtfmNode = new AudioWorkletNode(this.context, 'dtfm-processor');

                dtfmNode.port.onmessage = (ev : MessageEvent<string>) => {
                    if (ev.data) {
                        this.decodedMessage += ev.data || "";
                        callback(ev.data);
                    }
                };

                source.connect(dtfmNode);
                dtfmNode.connect(this.context.destination);
                this.context.resume();
            });
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
};
