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
                <Col className="p-3" lg={{ span: 6, offset: 3 }}>
                    <br />
                    <h1 className="mb-3 text-center">Asst.ai - Advanced AI Assistant</h1>
                    <h2 className="mb-3 text-center">"I literally can't live without Asst AI now!"</h2>
                    <p className="my-5 text-center">Let the worlds most advanced AI assitant, or asst. for short, help make your life better. Try our AI Christmas Card Writer <strong>FREE</strong>.</p>
                    
                  
                    
                    <Button href="/xmas-card-writer" variant="success" size="lg">🎄 Try Christmas Card Writer 🎄</Button>
                    <br />
               
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