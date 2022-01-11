import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

import AlgorithmSelector from './components/AlgorithmSelector';
import Encoded from './components/Encoded';
import Decoded from './components/Decoded';
import { useState } from 'react';
import useSharedValidityState from './components/useSharedValidityState';

function App() {

  const { validity, setValidity } = useSharedValidityState()

  return (
    <Container>
      <h2 className='text-center'>Debugger</h2>
      <Container>
        <Row>
          <AlgorithmSelector />
        </Row>
        <Row>
          <Encoded />
          <Decoded />
        </Row>
        <Row>
          <p className={ validity ? "text-success" : "text-danger" }>{ validity ? "Valid" : "Invalid" }</p>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
