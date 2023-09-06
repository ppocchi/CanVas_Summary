import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

import { sampleText } from './sampleText'


const App = () => {
  const [text, setText] = useState(sampleText)

  const handleChange = event => {
    setText(event.target.value)
  }

  return (
    <Container>
      <Row>
        <Col>
          <textarea 
            onChange={handleChange}
            value={text}
            className='form-control'
            rows='30' />
        </Col>
        <Col>
          <ReactMarkdown>{text}</ReactMarkdown>
        </Col>
      </Row>
    </Container>
  
  );

}

export default App;
