
import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col, Alert, FormControl } from 'react-bootstrap';
import axios from "axios";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Helmet } from 'react-helmet';

const { Configuration, OpenAIApi } = require('openai');
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY

const ArticleProofer = () => {
    const [heading, setHeading] = useState("The response from the AI will be shown here...");
    const [response, setResponse] = useState(".......... the AI is pondering world domination");
    const [copySuccess, setCopySuccess] = useState("");

    const [progress, setProgress] = useState(0);
    const [showProgressBar, setShowProgressBar] = useState(false);
    const [showResponseCard, setShowResponseCard] = useState(false);
    const [buttonText, setButtonText] = useState("Proof Article");

function onFormSubmit(e) {
    //start by preveting default page refresh
    e.preventDefault();
    setShowProgressBar(true);
    const formData = new FormData(e.target),
    formDataObj = Object.fromEntries(formData.entries())
    setProgress(10);
          
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    setProgress(20);
    
    const openai = new OpenAIApi(configuration);
    setProgress(30);

    const data = {
        model: 'text-davinci-003',
        prompt: `Proofread, correct all the spelling mistakes from the following article ${formDataObj.articleName}`,
        temperature: 0.73,
        max_tokens: 1800,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    }
    setProgress(40);

    axios.post("https://api.openai.com/v1/completions", data, {
        headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + API_KEY,
        },
        
    })
    .then(response => {
        console.log(response.data);
        setHeading(`Proofread Article`);
        setResponse(`${response.data.choices[0].text}`);
        setProgress(100);
        setShowResponseCard(true);
        setButtonText("Proof Article Again");
    })
    .catch(error => {
        console.log(error);
    });
    
}

const copyToClipboard = (e) => {
    navigator.clipboard.writeText(response);
    setCopySuccess("Copied!");
  };

return (
    <div>

<Helmet>
        <title>AI Assistant for Efficient Proofreading | Asst.ai</title>
        <meta name="description" 
    content="Asst.ai's advanced AI technology is revolutionising the way people proofread. Our AI assistant helps you identify and correct errors in your writing faster and more efficiently. Try Asst.ai now and see the difference for yourself" />
        </Helmet>
            
        <Container>
        <Row className="mt-5">
        <Col md={{ span: 8, offset: 2 }}>
            <h1>Proof Anything Asst</h1>
            <br /><br />
            <h2>Enter article and Asst will do the rest</h2>

            <br /><br />

            <Form onSubmit={onFormSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                   
                    <FormControl as="textarea" 
                        type="text"
                        name="articleName"
                        placeholder="Enter your article, for example: Artificial Intelligence (AI) is a field of computer science that has been around for decades. The goal of AI is to automate tasks that humans are currently required to perform." 
                        style={{height: "300px"}}/>

                        <Form.Text className="text-muted">
                            Enter your article for proofreading
                        </Form.Text>
                </Form.Group>

                <Button variant="dark gradient" size="lg" type="submit">
                {buttonText}
                </Button>

                {showProgressBar && <ProgressBar style={{width: "400px", height: "40px", marginLeft: "auto", marginRight: "auto", marginTop: "1rem"}} variant="success" now={progress} label={`${Math.round(progress)}%`} />}
 {progress === 100 && setTimeout(() => setShowProgressBar(false), 1000)}            
            </Form>
            <br /><br />

            {showResponseCard ? (
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h3> {heading} </h3></Card.Title>
               
                        <hr />
                        <br />

                    <Card.Text>
                     {response} 
                    </Card.Text>

                    {progress === 100 && <Button variant="dark" size="lg" onClick={copyToClipboard}>
                        Copy To Clipboard
                    </Button>}
                    {copySuccess && <Alert style={{marginTop: "1rem" }} variant="success">{copySuccess}</Alert>}
                </Card.Body>    
            </Card>
            ) : (
            null
            )}
            </Col>
      </Row>
        </Container>
        </div>
);
};
export default ArticleProofer;