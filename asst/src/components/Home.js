import React from "react";
import { Component } from "react";
import Display from "./Display"; 
import { Container, Button } from "react-bootstrap";
import cimage1 from '../cimage1.png'
import homepage from '../homepage.gif'

class Home extends Component {
    render() {
        return (
            <div>
                
         
      

                <Container className="text-center">
                <br />
                <h1>The worlds most advanced A.I Asst.</h1>
                <p>AI assistant, or Asst for short, will transform your productivity</p>
                <Button href="/xmas-card-writer" variant="success" size="lg">NEW Christmas Card Writer</Button>
                <br />
                
                
                <img src={homepage} />




            </Container>
            </div>
        )
    }
}

export default Home;