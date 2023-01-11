import React from "react";
import { Component } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import fp from '../fp-1.png';


class Home extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row className="text-center">
                        <Col lg={{ span: 8, offset: 2 }} className="mt-3 p-3">
                           
                            <h1 className="mb-3 text-center">Asst.ai - Advanced AI Assistant</h1>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col lg={{ span: 6, offset: 3 }}>
                            <p className="mb-3 text-center">Asst AI chat technology is so advanced and user-friendly that it's a must-try for anyone looking to experience the latest in AI-based conversation problem solving</p>
                            <Button href="/chat" variant="dark" size="lg">Most Advanced AI Chat in the World </Button>
                        </Col>
                    </Row>
                    <Row className="text-left mt-5">
                        
                        <Col xs={12} md={6} className="p-3 small-text">
                            <h2>What is Asst.?</h2>
                            <p className="small-text">Asst. is a powerful artificial intelligence (AI) assistant that helps people make their lives easier. Asst. is capable of carrying out a wide range of tasks, from helping with scheduling and planning, to providing advice and assistance with problem-solving.</p>
                            <p className="small-text">Asst. is designed to be a self-learning AI that is constantly learning and improving itself. Asst. is capable of understanding complex conversations and adapting its responses to changing situations.</p>
                            <h2>How Does Asst. Work?</h2>
                            <p className="small-text">Asst. uses natural language processing (NLP) technology to understand what people are saying and provide relevant information and advice. Asst. also uses machine learning (ML) algorithms to learn from its interactions with people and refine its responses. Asst. is constantly learning and adapting to provide better and more accurate results.</p>
                            <p className="small-text">Asst. is also able to connect to other services, such as weather apps, calendar apps, and other AI assistants, to give users access to more information and features.</p>
                        </Col>
                        <Col xs={12} md={6} className="p-3">
                            <img src={fp} className="img-fluid"/>
                        </Col>
                        
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;