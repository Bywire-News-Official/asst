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
    
        // Initialize the OpenAI API client
    const openai = new OpenAIApi({
    apiKey: API_KEY,
    config: new Configuration(),
    });

    const sendMessage = useCallback(async () => {
    if (!userInput.trim()) return;

    setUserMessage([...userMessage, { text: userInput, image: avatar }]);
    setButtonText("Sending...");

    try {
    const result = await openai.createCompletion({
    engine: "text-davinci-002",
    prompt: User: ${userInput}\nAI:,
    maxTokens: 150,
    n: 1,
    stop: null,
    temperature: 0.7,
    topP: 1,
    });
        
    const aiResponse = result.choices[0].text.trim();
    setBotMessage([...botMessage, { text: aiResponse, image: BotPicture }]);
    setResponse(aiResponse);
    setHeading("The AI has responded:");
        
    } catch (error) {
setBotMessage([...botMessage, { text: "Error occurred. Please try again.", image: BotPicture }]);
setResponse("Error occurred. Please try again.");
setHeading("Error:");
} finally {
setButtonText("Send");
setUserInput('');
}
}, [userInput, userMessage, botMessage, avatar]);

const handleKeyPress = (event) => {
if (event.key === "Enter") {
event.preventDefault();
sendMessage();
}
};

return (
<Container>
<h3>{heading}</h3>
<p>{response}</p>
<Row>
<Col>
<Form>
<FormControl
as="textarea"
rows={3}
value={userInput}
onChange={(e) => setUserInput(e.target.value)}
onKeyPress={handleKeyPress}
/>
</Form>
</Col>
<Col>
<Button onClick={sendMessage} disabled={buttonText === "Sending..."}>
{buttonText}
</Button>
</Col>
</Row>
<Row>
{userMessage.map((message, index) => (
<Col key={user-${index}}>
<img src={message.image} alt="User Avatar" />
<p>{message.text}</p>
</Col>
))}
{botMessage.map((message, index) => (
<Col key={bot-${index}}>
<img src={message.image} alt="Bot Avatar" />
<p>{message.text}</p>
</Col>
))}
</Row>
</Container>
);

};

export default Chat;
