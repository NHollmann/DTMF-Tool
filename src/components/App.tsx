import React from 'react';
import { Container, Paper, Typography } from '@material-ui/core';
import Encoder from './Encoder';
import { DTMF } from '../utils/dtmf';

const dtmf = new DTMF();

const App: React.FC = () => {
  return (
    <Container maxWidth="md" style={{ padding: 20 }}>
      <Paper style={{ padding: 10 }}>
        <Typography variant="h3">
          DTMF Encoder/Decoder
        </Typography>
        <Typography gutterBottom>
          This tool alows you to encode or decode DTMF (dual-tone multi-frequency) signals.
        </Typography>
        <br />

        <Typography variant="h4">
          DTMF Encoder
        </Typography>
        <Encoder dtmf={dtmf} />

        <br />
        <Typography variant="h4">
          DTMF Decoder
        </Typography>
        <Typography>
          Coming soon.
        </Typography>
        <br />
      </Paper>
    </Container>
  );
}

export default App;
