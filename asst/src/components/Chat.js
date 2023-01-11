import React, { useState } from "react";
import { Container, Form, Button, Row, Col, FormControl } from 'react-bootstrap';
import axios from "axios";
import ProfilePicture from "../person.gif";
import BotPicture from "../bot.gif";
import RobotPicture from "../robot.gif";
import AlienPicture from "../alien.gif";
import Robot2Picture from "../robot2.gif";
import Robot3Picture from "../robot3.gif";

const { Configuration, OpenAIApi } = require('openai');
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY


const Chat = () => {
    const [heading, setHeading] = useState("The response from the AI will be shown here...");
    const [response, setResponse] = useState(".......... the AI is pondering world domination");
    const [copySuccess, setCopySuccess] = useState("");
    const [buttonText, setButtonText] = useState("Send");
    const [userInput, setUserInput] = useState('');
    const [userMessage, setUserMessage] = useState([]);
    const [botMessage, setBotMessage] = useState([]);
    const [avatar, setAvatar] = useState(ProfilePicture);

    function onFormSubmit(e) {
        //start by preveting default page refresh
        e.preventDefault();
        setButtonText("Waiting for response...");
        const formData = new FormData(e.target.form),
        formDataObj = Object.fromEntries(formData.entries())
        let promptText = formDataObj.articleName;
        if (promptText === '') {
            promptText = 'Hello';
        }
              
        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        });
        
        const openai = new OpenAIApi(configuration);
    
        const data = {
            model: 'text-davinci-003',
            //prompt: `Update this text making it more professional, thoughtful and well written: ${formDataObj.articleName}`,
            prompt: promptText,
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
                <br />
                <h2 className="mb-4">Start a conversation</h2>

                {userMessage.map((message, index) => (
                    <Row key={index} className="margin-top-desk">
                           <Col sm={2} md={2}>
                            <img src={avatar} alt="person" />
                        </Col>
                        <Col sm={6} md={10} >
                            <div className="user-conversation-box p-3" style={{ backgroundColor:"rgb(255 226 226)", minHeight:"100px" }}>
                                
                                {message}
                            </div>
                        </Col>
                        <Col md={2} className="margin-top-desk">
                        <img src={BotPicture} alt="bot" />
                        </Col>
                        <Col md={10} className="margin-top-desk">
                            <div className="bot-conversation-box p-3" style={{ backgroundColor:"#f1f1f1", minHeight:"100px" }}>
                                {botMessage[index]}
                            </div>
                        </Col>
                     
                    </Row>
                ))}
    
                <br /><br />

                <Form.Group>
                    <Form.Label>Choose your Avatar</Form.Label>
                    <Form.Control as="select" onChange={e => setAvatar(e.target.value)} style={{width: '30%'}}>
                        <option value={ProfilePicture}>Default</option>
                        <option value={BotPicture}>ByBot</option>
                        <option value={RobotPicture}>Avatar 1</option>
                        <option value={AlienPicture}>Avatar 2</option>
                        <option value={Robot2Picture}>Avatar 3</option>
                        <option value={Robot3Picture}>Avatar 4</option>
                    </Form.Control>
                </Form.Group>
    
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