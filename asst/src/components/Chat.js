import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col, Alert, FormControl } from 'react-bootstrap';
import axios from "axios";
import ProfilePicture from "../person.gif";
import BotPicture from "../bot.gif";

const { Configuration, OpenAIApi } = require('openai');
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY

const Chat = () => {
    const [heading, setHeading] = useState("The response from the AI will be shown here...");
    const [response, setResponse] = useState(".......... the AI is pondering world domination");
    const [copySuccess, setCopySuccess] = useState("");
    const [temperature, setTemperature] = useState(0.7);
    const [maxTokens, setMaxTokens] = useState(4000);
    const [buttonText, setButtonText] = useState("Send");
    const [userInput, setUserInput] = useState('');
    const [userMessage, setUserMessage] = useState([]);
    const [botMessage, setBotMessage] = useState([]);

    function onFormSubmit(e) {
        //start by preveting default page refresh
        e.preventDefault();
        setButtonText("Waiting for response...");
        const formData = new FormData(e.target.form),
        formDataObj = Object.fromEntries(formData.entries())
              
        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        });
        
        const openai = new OpenAIApi(configuration);
    
        const data = {
            model: 'text-davinci-003',
            //prompt: `Update this text making it more professional, thoughtful and well written: ${formDataObj.articleName}`,
            prompt: formDataObj.articleName,
            temperature: 0.7,
            max_tokens: 4000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }
    
        axios.post("https://api.openai.com/v1/completions", data, {
            headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + API_KEY,
            },
            
        })
        .then(response => {
            console.log(response.data);
            setHeading(``);
            setResponse(`${response.data.choices[0].text}`);
            setButtonText("Send");
            setUserMessage(userMessage => [...userMessage, formDataObj.articleName]);
            setBotMessage(botMessage => [...botMessage, `${response.data.choices[0].text}`]);
            setUserInput('');
        })
        .catch(error => {
            console.log(error);
        });
        
    }

    const onKeyPress = e => {
        if(e.key === 'Enter' || e.key === 'Return') {
            onFormSubmit(e);
        }
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
                <h1>Asst AI Chat</h1>
                <br /><br />
                <h2>Start a conversation</h2>

                {userMessage.map((message, index) => (
                    <Row key={index} style={{ marginTop: "5rem" }}>
                           <Col md={2}>
                            <img src={ProfilePicture} alt="person" />
                        </Col>
                        <Col md={10} >
                            <div className="user-conversation-box p-3" style={{ backgroundColor:"rgb(255 226 226)", minHeight:"100px" }}>
                                
                                {message}
                            </div>
                        </Col>
                        <Col md={2} style={{ marginTop: "5rem" }}>
                        <img src={BotPicture} alt="bot" />
                        </Col>
                        <Col md={10} style={{ marginTop: "5rem", backgroundColor:"#f1f1f1", minHeight:"100px" }}>
                            <div className="bot-conversation-box p-3" >
                                
                                {botMessage[index]}
                            </div>
                        </Col>
                     
                    </Row>
                ))}
    
                <br /><br />
    
                <Form onSubmit={onFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                       
                        <FormControl as="textarea" 
                            type="text"
                            name="articleName"
                            placeholder="Start a conversation, ask me anything..." 
                            onChange={e => setUserInput(e.target.value)}
                            value={userInput}
                            style={{height: "100px"}}
                            onKeyPress={onKeyPress} />
    
                            <Form.Text className="text-muted">
                                Start a conversation
                            </Form.Text>
                    </Form.Group>
    
                   
    
                    <Button variant="dark gradient" size="lg" type="submit">
                    {buttonText}
                    </Button>
    
                    
                </Form>
                <br /><br />
    
                
                </Col>
          </Row>
            </Container>
            </div>
    );
    };
    export default Chat;
