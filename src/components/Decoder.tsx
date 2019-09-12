import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { DTMF } from '../utils/dtmf';

interface Props {
    dtmf: DTMF;
}

const Decoder = ({ dtmf }: Props) => {
    const [letter, setLetter] = useState<string>("None");

    const decodeCallback = (letter: string | null) => {
        setLetter(letter || "None");
    }

    return (
        <>
            <Typography gutterBottom>
                You can capture the sound of your microphone. You should use a different device to generate the tones.
            </Typography>
            <Button variant="contained" onClick={() => dtmf.captureDTMF(decodeCallback)}>Capture Audio</Button>
            <br /><br />
            <Typography gutterBottom>
                Letter: {letter}
            </Typography>
            <Typography gutterBottom>
                Message: {dtmf.getDecodedMessage()}
            </Typography>
        </>
    );
}

export default Decoder;
