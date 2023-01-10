
import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col, Alert, FormControl } from 'react-bootstrap';
import axios from "axios";
import ProgressBar from 'react-bootstrap/ProgressBar';

const { Configuration, OpenAIApi } = require('openai');
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY

const Summary = () => {
    const [heading, setHeading] = useState("The response from the AI will be shown here...");
    const [response, setResponse] = useState(".......... the AI is pondering world domination");
    const [responses, setResponses] = useState([]);
    const [copySuccess, setCopySuccess] = useState("");
    const [error, setError] = useState("");
    const [temperature, setTemperature] = useState(0.73);
    const [maxTokens, setMaxTokens] = useState(4000);

    const [progress, setProgress] = useState(0);
    const [showProgressBar, setShowProgressBar] = useState(false);
    const [showResponseCard, setShowResponseCard] = useState(false);
    const [buttonText, setButtonText] = useState("Write Summary");

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
            prompt: `Create a summary from this text: ${formDataObj.articleName}`,
            temperature: parseInt(formDataObj.temperature),
            max_tokens: parseInt(formDataObj.maxTokens),
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
            setHeading(`Content Summary`);
            setResponse(`${response.data.choices[0].text}`);
            setProgress(100);
            setShowResponseCard(true);
            setButtonText("Summarise another article");
            // add a check here to make sure that the response is unique
            if (!responses.includes(response.data.choices[0].text)) {
                setResponses([response.data.choices[0].text, ...responses]);
            }
            else {
                console.log('This response has already been generated!');
            }
        })
        .catch(error => {
            console.log(error);
            setError("There was an error summarising the article. Please try again!");
        });
        
    }
    
    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(response);
        setCopySuccess("Copied!");
      };
    
    return (
        <div>
                
            <Container>
            <Row className="mt-5">
            <Col md={{ span: 8, offset: 2 }}>
                <h1>Asst AI Content Summary Generator</h1>
                <br /><br />
                <h2>Enter text and hit Go</h2>
    
                <br /><br />
    
                <Form onSubmit={onFormSubmit}>
    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                       
                        <FormControl as="textarea" 
                            type="text"
                            name="articleName"
                            placeholder="Enter your article, for example: Artificial Intelligence (AI) is a field of computer science that has been around for decades. The goal of AI is to automate tasks that humans are currently required to perform." 
                            style={{height: "300px"}}/>
    
                            <Form.Text className="text-muted">
                                Enter your article to summarise
                            </Form.Text>
                    </Form.Group>
    
                    <Form.Group controlId="formBasicRange">
                        <Form.Label>Temperature</Form.Label>
                        <Form.Control type="range" name="temperature" min="0" max="1" step="0.01" />
                        <Form.Text className="text-muted">
                            0 is conservative and 1 is more creative
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicNumber">
                        <Form.Label>Max Tokens</Form.Label>
                        <Form.Control type="number" name="maxTokens" value={maxTokens} onChange={e => setMaxTokens(e.target.value)} min="1" max="4000" />
                        <Form.Text className="text-muted">
                            The maximum number of tokens allowed in the response. 1,000 tokens is about 750 words.
                        </Form.Text>
                    </Form.Group>
    
                    <Button variant="dark gradient" size="lg" type="submit">
                    {buttonText}
                    </Button>
    
                    {showProgressBar && <ProgressBar style={{width: "400px", height: "40px", marginLeft: "auto", marginRight: "auto", marginTop: "1rem"}} variant="success" now={progress} label={`${Math.round(progress)}%`} />}
     {progress === 100 && setTimeout(() => setShowProgressBar(false), 1000)}            
                </Form>
                <br /><br />
                {error && <Alert style={{marginTop: "1rem" }} variant="danger">{error}</Alert>}

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
            <Container>
            <Row className="mt-5">
            <Col md={{ span: 8, offset: 2 }}>
            {responses.map((response, index) => (
              <Card key={index}>
                  <Card.Body>
                      <Card.Title>
                         <h3> Summary V{index+1} </h3></Card.Title>
                 
                         <hr />
                         <br />
  
                      <Card.Text>
                       {response} 
                      </Card.Text>
                      
                  </Card.Body>    
              </Card>
            ))}
            </Col>
            </Row>
            </Container>
            </div>
    );
    };
    export default Summary;

