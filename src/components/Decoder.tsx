import React, { useState } from 'react';
import { Button, Typography, Container, Chip } from '@material-ui/core';
import { DTMF } from '../utils/dtmf';

interface Props {
    dtmf: DTMF;
}

// Hack based on https://stackoverflow.com/a/53837442
function useForceUpdate(){
    const [, set] = useState(true); //boolean state
    return () => set(value => !value); // toggle the state to force render
}

const Decoder = ({ dtmf }: Props) => {
    const [letter, setLetter] = useState<string>("??");
    const forceUpdate = useForceUpdate();

    const decodeCallback = (letter: string | null) => {
        setLetter(letter || "??");
    };

    const clearMessage = () => {
        dtmf.clearDecodedMessage();
        forceUpdate();
    };

    return (
        <>
            <Typography gutterBottom>
                You can capture the sound of your microphone. You should use a different device to generate the tones.
            </Typography>
            <Container maxWidth="xs">
                <Button fullWidth variant="contained" onClick={() => dtmf.captureDTMF(decodeCallback)}>Capture Audio</Button>
            </Container>
            <br /><br />
            <Typography gutterBottom>
                Letter: <Chip component="span" label={letter} color="primary" />
            </Typography>
            <Typography gutterBottom>
                Number: {dtmf.getDecodedMessage().length > 0 && (
                    <Chip component="span" label={dtmf.getDecodedMessage()} onDelete={clearMessage} />
                )}
            </Typography>
        </>
    );
}

export default Decoder;
