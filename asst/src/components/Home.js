import React from "react";
import { Component } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import homepage from '../homepage.gif';
import twitter from '../twitter.gif';

class Home extends Component {
    render() {
        return (
            <div>
                

                <Container >
                <Row className="text-center">
                <Col className="p-3" lg={{ span: 8, offset: 2 }}>
                    <br />
                    
                    <h1 className="mb-5 text-center display-4">"The greatest force in the universe is the power of human and artificial intelligence working in harmony"</h1>
                    <h1 className="mb-3 text-center">Asst.ai - Advanced AI Assistant</h1>
                  
               
                    </Col>
                     </Row>
                     <Row className="text-center ">
                     <Col className="p-3" lg={{ span: 6, offset: 3 }}>
                     <p className="mb-3 text-center">Let the worlds most advanced AI assitant, or asst. for short, help make your life easier. Try our AI Christmas Card Writer <strong>FREE</strong>.</p>
                     <br />
                  
                    
                    <Button href="/xmas-card-writer" variant="success" size="lg">🎄 Try Christmas Card Writer 🎄</Button>
                    
                     </Col>
                     </Row>
                
                <Row className="text-left ">
                    <Col xs={12} md={6}>     
                    </Col>
                    <Col xs={12} md={6}>  </Col>

                </Row>
            </Container>
            </div>
        )
    }
}

export default Home;