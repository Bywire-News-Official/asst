import React from "react";
import { Component } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import cimage1 from '../cimage1.png'
import homepage from '../homepage.gif'
import Image from 'react-bootstrap/Image'

class Home extends Component {
    render() {
        return (
            <div>
                
         
      

                <Container className="text-center">
                <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <br />
                    <h1>The worlds most advanced A.I Asst.</h1>
                    <p>AI assistant, or Asst for short, will transform your productivity</p>
                    <Button href="/xmas-card-writer" variant="success" size="lg">NEW Christmas Card Writer</Button>
                    <br />
                    </Col>
                     </Row>

                    <Row>

                  

                    <img src={homepage} className="fluid" />


                   
                </Row>
            </Container>
            </div>
        )
    }
}

export default Home;