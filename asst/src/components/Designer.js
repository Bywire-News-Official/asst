import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col, Alert, Modal } from 'react-bootstrap';
import { Configuration, OpenAIApi } from 'openai';
import ProgressBar from 'react-bootstrap/ProgressBar';
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY


function AboutUs() {

    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [placeholder, setPlaceholder] = useState(
      "Describe the type of image you would like to create in as much detail as possible"
    );
    const [show, setShow] = useState(false);
    const [imageURL, setImageURL] = useState('');
  
      
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });
    
      const openai = new OpenAIApi(configuration);
  
    const generateImage = async () => {
      setPlaceholder(`Search ${prompt}..`);
      setLoading(true);
      const res = await openai.createImage({
        prompt: prompt,
        n: 4,
        size: "512x512",
      });
      setLoading(false);
      // update the state of result to append the newly generated images
      setResult([...result, ...res.data.data.map(image => image.url)]);
      
    };
    
    const handleClose = () => setShow(false);
    const handleShow = (imageURL) => {
      setShow(true);
      setImageURL(imageURL);
    };
    const handleSaveImage = (imageURL) => {
        //TODO: Save image to local storage or database
        const link = document.createElement('a');
        link.download = prompt;
        link.href = imageURL
        link.target = "_blank"
        link.click();
    }
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
      Generate New Images
      </Button>
      <br />
      {loading ? <ProgressBar animated variant="info" now={100} /> : <div></div> }
      <br /><br />
  
      {result.length > 0 ? (
             <Row>
                 {result.map(image => (
                     <Col md={3} className="my-2">
                         <Card>
                             <Card.Img variant="top" src={image} onClick={() => handleShow(image)}/>
                             <Button onClick={() => handleSaveImage(image)} variant="light gradient" size="sm" type="submit">
                                Save
                             </Button>
                         </Card>
                     </Col>
                 ))}
                 <hr />
             </Row>
            ) : (
              <></>
            )}
  
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generated Image</Modal.Title>
        </Modal.Header>
        <Modal.Body><img src={imageURL} alt={prompt} className="img-fluid" /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  
      
                      </Col>
                  </Row>
  
  
                   </Container>
              
              </div>
  
  
              )
      }
  
  
  export default AboutUs;