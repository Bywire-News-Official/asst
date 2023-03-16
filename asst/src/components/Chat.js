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
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

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

    const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Waiting for response...");

    let promptText = userInput.trim() || '';
    console.log("User input:", promptText); // Log the user input to the console
    const isCodeInput = isCode(promptText);

    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const data = {
        model: isCodeInput ? 'code-davinci-002' : 'text-davinci-003',
        prompt: promptText,
        ...(!isCodeInput && {
            temperature: 0.7,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }),
    };

    setUserMessage(userMessage => [...userMessage, userInput]);
        try {
            const response = await axios.post("https://api.openai.com/v1/completions", data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + API_KEY,
                },
            });
            setHeading('');
            const responseText = isCodeInput
                ? `<pre><code>${response.data.choices[0].text}</code></pre>`
                : response.data.choices[0].text;
            setResponse(responseText);
            setButtonText("Send");
            setBotMessage(botMessage => [...botMessage, responseText]);
            setUserInput('');
            window.scrollTo(0, document.body.scrollHeight);
        } catch (error) {
            console.log(error);
        }
    }, [API_KEY]);
}

    const isCode = (input) => {
        const codeRegex = /(function|var|let|const|{|})/g;
        return codeRegex.test(input);
    };

    const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.ctrlKey) {
        e.preventDefault();
        handleSubmit(e);
    }

    if (e.key === 'Enter' && e.ctrlKey) {
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
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Ask the AI</Form.Label>
                            <FormControl
    as="textarea"
    rows={3}
    value={userInput}
    onChange={e => setUserInput(e.target.value)}
    onKeyDown={onKeyDown}
/>


                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {buttonText}
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <h3>{heading}</h3>
                    <div dangerouslySetInnerHTML={{ __html: response }}></div>
                    {copySuccess && <p>{copySuccess}</p>}
                    <Button onClick={e => copyToClipboard(e)}>Copy response</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Conversation History</h3>
                    {userMessage.map((message, index) => (
                        <div key={index}>
                            <p>
                                <strong>You:</strong> {message}
                            </p>
                            <p>
                                <strong>AI:</strong> {botMessage[index]}
                                {copiedMessages.includes(index) && (
                                    <span style={{ color: "green" }}> (Copied)</span>
                                )}
                            </p>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default Chat;
