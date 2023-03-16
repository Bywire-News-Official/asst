import React, { useState, useCallback } from "react";
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
    const [copiedMessages, setCopiedMessages] = useState([]);

    const onFormSubmit = useCallback(async e => {
    e.preventDefault();
    setButtonText("Waiting for response...");
    const formData = new FormData(e.target.form);
    const formDataObj = Object.fromEntries(formData.entries());
    let promptText = formDataObj.articleName || '';
    const isCodeInput = isCode(promptText);
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    let data = {};
    // Check if the input is code
    if (isCode(promptText)) {
        data = {
            model: 'code-davinci-002', // Keep the code model you were using previously
            prompt: promptText,
        }
    } else {
        data = {
        model: 'gpt-4', // Update the model name to GPT-4
        prompt: promptText,
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        };
    }
    setUserMessage(userMessage => [...userMessage, formDataObj.articleName]);
    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + API_KEY,
            },
        });
        setHeading('');
        let responseText;
        // Check if the input is code
        if (isCode(promptText)) {
            responseText = `<pre><code>${response.data.choices[0].text}</code></pre>`;
        } else {
            responseText = response.data.choices[0].text;
        }
        setResponse(responseText);
        setButtonText("Send");
        setBotMessage(botMessage => [...botMessage, responseText]);
        setUserInput('');
        window.scrollTo(0, document.body.scrollHeight);
    } catch (error) {
        console.log(error);
    }
}, [API_KEY]);

    
    // Function to check if the input is code
    const isCode = (input) => {
        const codeRegex = /(function|var|let|const|{|})/g;
        return codeRegex.test(input);

    }
    

    const onKeyPress = e => {
        if(e.key === 'Enter' || e.key === 'Return') {
            onFormSubmit(e);
        }

        if(e.key === 'Control' && e.key === 'Enter') {
            addNewLine();
        }
    };
    
    const copyToClipboard = (e, index) => {
        setCopiedMessages(copiedMessages => [...copiedMessages, index]);
        navigator.clipboard.writeText(response);
        setCopySuccess("Copied!");
    };
    
    const addNewLine = () => {
        let textarea = document.querySelector('textarea');
        textarea.value += '\n';
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
                                <Row>
                                    <Col sm={2} md={2} className="p-2">
                                        <img src={avatar} alt="person" />
                                    </Col>
                                    <Col sm={6} md={10} >
                                        <div className="user-conversation-box p-3" style={{ backgroundColor:"rgb(255 236 236)", minHeight:"100px" }}>
                                            {message}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2} className=" p-2">
                                        <img src={BotPicture} alt="bot" />
                                    </Col>
                                    <Col md={10} className="">
                                        <div className="bot-conversation-box p-3" style={{ backgroundColor:"#f1f1f1", minHeight:"100px" }}>
										{isCode(response) ? <pre><code>{botMessage[index]}</code></pre> : botMessage[index]}
                                            <br />
                                        </div>
                                    </Col>
                                    <Row className="mb-2">
                                        <Col md={11}></Col>
                                        <Col md={1} className="">
                                            <Button  variant="dark" size="sm" type="button" onClick={(e) => copyToClipboard(e, index)}>
                                                Copy
                                            </Button>
                                            {copiedMessages.includes(index) ? "Copied!" : ""}
                                        </Col>
                                    </Row>
                                </Row>
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
                                    rows="4"
                                    cols="50"
                                    onKeyPress={onKeyPress} />
                                <Form.Text className="text-muted">
                                    Start a conversation
                                </Form.Text>
                            </Form.Group>
                            <Button variant="dark gradient" size="lg" type="submit" onClick={onFormSubmit}>
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
