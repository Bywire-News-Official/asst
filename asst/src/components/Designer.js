import { useState } from "react";
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { Configuration, OpenAIApi } from 'openai';
import ProgressBar from 'react-bootstrap/ProgressBar';
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY


function AboutUs() {

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Describe the type of image you would like to create in as much detail as possible"
  );

    
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
  
    const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
    
  };
    
        return (
            <div>
                 <Container>
                 <Row className="mt-5">
            <Col md={{ span: 8, offset: 2 }}>
    
    
                <h1>Image Generator Asst</h1>
                <br /><br />
                
    
                <br /><br />

                </Col>

                </Row>

                <Row>
                    <Col md={{ span: 8, offset: 2 }}>

                    

                    <Form>
    
    <Form.Group>
       
        <Form.Control
            type="text"
            name="imageInput"
            style={{height: "50px"}}
            placeholder={placeholder} 
            onChange={(e) => setPrompt(e.target.value)}
            />

            <Form.Text className="text-muted">
                Enter as much information as possible for a more accurate image
            </Form.Text>
    </Form.Group>
    </Form>
            <br />
    <Button onClick={generateImage} variant="dark gradient" size="lg" type="submit">
    Generate an Image
    </Button>
    {loading ? <ProgressBar animated variant="info" now={100} /> : <div></div> }
    <br /><br />

    {result.length > 0 ? (
           <img src={result} alt={prompt} />
          ) : (
            <></>
          )}

    
                    </Col>
                </Row>


                 </Container>
            
            </div>


            )
    }


export default AboutUs;