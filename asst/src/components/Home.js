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
                <Row className="text-left">
                <Col className="p-3" lg={{ span: 6, offset: 3 }}>
                    <br />
                    <h1 className="mb-3">Asst.AI</h1>
                    <h2 className="mb-3">Your Personal AI Assisant</h2>
                    <p className="mb-3 lead">Ready to make your holiday season extra special? </p>
                    <p>Let your new assistant, or asst. for short, take care of all your Christmas card writing needs. Our advanced AI Asst. can help you craft meaningful and thoughtful messages tailored to each of your recipients. </p>
                        <p>With Asst., you can express your gratitude and appreciation in a personalised, heartfelt, yet timely manner.</p>
                    <p className="my-3">Get started totally free this Christmas, and make your holiday season even more memorable!</p>
                    <Button href="/xmas-card-writer" variant="success" size="lg">🎄 Christmas Card Writer 🎄</Button>
                    <br />
               
                    </Col>
                     </Row>

                    <Row>

                  

                   


                   
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