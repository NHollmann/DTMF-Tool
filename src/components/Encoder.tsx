import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { DTMF } from '../utils/dtmf';

interface Props {
    dtmf: DTMF;
}

const Encoder = ({ dtmf }: Props) => {
    return (
        <>
            <Typography gutterBottom>
                Use this dialpad to create the corresponding DTMF tones.
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('1')}>1</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('2')}>2</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('3')}>3</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('A')}>A</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('4')}>4</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('5')}>5</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('6')}>6</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('B')}>B</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('7')}>7</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('8')}>8</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('9')}>9</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('C')}>C</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('*')}>*</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('0')}>0</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('#')}>#</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtmf.playNote('D')}>D</Button>
                </Grid>
            </Grid>
        </>
    );
}

export default Encoder;