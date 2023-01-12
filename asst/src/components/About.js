import React from "react";
import { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { MemberstackProvider } from "@memberstack/react"; 


class AboutUs extends Component {
    render() {
        return (
            <div>
                 <HelmetProvider>
                 <Helmet>
      <title>About Asst.ai - The Advanced AI Assistant for Design and Coding</title>
      <meta name="description" 
    content="Learn more about Asst.ai, the advanced AI assistant for design and coding. Our AI technology simplifies your workflow and helps you create and code more efficiently. Discover the benefits of Asst.ai and see why it's the ultimate AI assistant for design and coding." />
      </Helmet>

                 <Container >
                <Row className="text-left">
                <Col className="mt-5 p-3" lg={{ span: 6, offset: 3 }}>
                <h1 className="mb-3">Welcome to Asst.ai</h1>
<p>At Asst.ai, we believe in the power of AI to make your life simpler and more streamlined. We are passionate about providing innovative AI-powered solutions to make even the most mundane tasks easier.</p>

<p>Our AI-powered solutions include a unique greeting card message writer, AI artist designer, AI news and article writer, AI proofer, and even an AI Tweet writer. With these solutions, you can easily write the perfect greeting card message in a fraction of the time, create a beautiful design or artwork, stay up-to-date with news and articles, proofread articles quickly and accurately, and craft the perfect tweet.</p>

<p>We are committed to providing the best AI-powered solutions to make your life much easier. Our solutions are designed to help you save time, money, and energy, so you can focus on the things that matter most to you.</p>

<p>Asst.ai is an innovative and cutting-edge AI technology company that is changing the way people live. We are dedicated to providing the best AI-powered solutions to make your life simpler and more efficient. Our goal is to help you streamline your life, so you can focus on the things that make you happiest.</p>

<p>If you’re looking for a way to make your life easier and more efficient, Asst.ai is the perfect solution. Let us help you take your life to the next level today!</p>
</Col> 
                     </Row>
            
                     </Container>
                     </HelmetProvider>
            </div>


            )
    }
}

export default AboutUs;



