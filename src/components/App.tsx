import React from 'react';
import { Container, Paper, Typography } from '@material-ui/core';
import Encoder from './Encoder';
import { DTFM } from '../utils/dtfm';

const dtfm = new DTFM();

const App: React.FC = () => {
  return (
    <Container maxWidth="md" style={{ padding: 20 }}>
      <Paper style={{ padding: 10 }}>
        <Typography variant="h3">
          DTFM Encoder/Decoder
        </Typography>
        <Typography gutterBottom>
          This tool alows you to encode or decode DTFM signals.
        </Typography>

        <Typography variant="h4">
          DTFM Encoder
        </Typography>
        <Encoder dtfm={dtfm} />

        <Typography variant="h4">
          DTFM Decoder
        </Typography>
      </Paper>
    </Container>
  );
}

export default App;
