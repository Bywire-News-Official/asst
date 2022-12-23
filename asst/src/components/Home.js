import React from "react";
import { Component } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import homepage from '../homepage.gif';
import Image from 'react-bootstrap/Image';
import twitter from '../twitter.gif';

class Home extends Component {
    render() {
        return (
            <div>
                
         
      

                <Container >
                <Row className="text-center">
                <Col lg={{ span: 6, offset: 3 }}>
                    <br />
                    <h1>The worlds most advanced A.I Asst.</h1>
                    <p>AI assistant, or Asst for short, will transform your productivity</p>
                    <Button href="/xmas-card-writer" variant="success" size="lg">🎄 NEW Christmas Card Writer 🎄</Button>
                    <br />
               
                    </Col>
                     </Row>

                    <Row>

                  

                    <img src={homepage} className="fluid" />


                   
                </Row>
                <Row className="text-left ">
                    <Col xs={12} md={6}>     <p className="mt-5">Welcome to Asst.ai, the world's most powerful AI writing and list assistance company. We are dedicated to helping our customers save time and streamline their tasks through the use of advanced artificial intelligence technology.</p>

<p>With Asst.ai, you can rely on our AI writing capabilities to tackle a wide range of projects, including business reports, emails, social media posts, and even Christmas cards. Our AI writing technology is able to understand and interpret your unique writing style, making it easy for you to delegate tasks and trust that the end result will meet your high standards.</p>

<p>In addition to our AI writing capabilities, Asst.ai also offers top-notch list assistance services. Our AI algorithms can quickly and accurately organize and manage your to-do lists, shopping lists, and any other lists you need to keep track of. This can help you stay on top of your tasks and make the most of your time.</p>

</Col>
<Col xs={12} md={6}>  <img width={"100%"} src={twitter} className="fluid" /></Col>

                </Row>
            </Container>
            </div>
        )
    }
}

export default Home;