import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { DTFM } from '../utils/dtfm';

interface Props {
    dtfm: DTFM;
}

const Encoder = ({ dtfm }: Props) => {
    return (
        <>
            <Typography gutterBottom>
                Use this dialpad to create the corresponding DTFM tones.
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('1')}>1</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('2')}>2</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('3')}>3</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('A')}>A</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('4')}>4</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('5')}>5</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('6')}>6</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('B')}>B</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('7')}>7</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('8')}>8</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('9')}>9</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('C')}>C</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('*')}>*</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('0')}>0</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('#')}>#</Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" onClick={() => dtfm.playNote('D')}>D</Button>
                </Grid>
            </Grid>
        </>
    );
}

export default Encoder;
