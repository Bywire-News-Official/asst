import React, { useState } from "react";
import { Container, Row, Col, Button, Card, ProgressBar, Modal, Form } from "react-bootstrap";
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY

const userInputs = [
    "a teenage girl of afghani descent with striking rainbow eyes stares at the camera with a deep red head scarf",
    "A digital Illustration of the a purely mechanical television, 4k, detailed, fantasy vivid colors",
    "A ktm motorcycle in a narrow cyberpunk street, photography",
    "pink ape Astronaut in space holding a claymate in a photorealistic style, digital art",
    "a big large happy kawaii fluffy cutest baby Shiba-inu puppy wearing kimono enjoy shopping in a futuristic abandoned city, anime movie, IMAX, cinematic lighting, only in cinema, Makoto Shinkai",
    "portrait of a young woman, brown medium hair, clean skin, hazel eyes, intricate artwork by Joaquin Sorolla, soft natural light, 85mm, sunshine on her face, lights and shadows",
    "a photo of cat flying out to space as an astronaut, digital art",
    "a desparate middle-aged man, utterly depressive, drowns in sorrow",
    "An artistic render of a fox made of fire",
    "A digital Illustration of a hovering house in palm springs synthwave",
    "Haunting November day in Weimar Berlin people on the street dark cabaret Grosz",
    "Shagy from Scooby-doo in an Cyberpunk look, but confused, and somewhat used, holding a copy of a book called private eye"
]

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState([]);
  const [variations, setVariations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    'Describe the type of image you would like to create in as much detail as possible'
  );
  const [show, setShow] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [apiCalled, setApiCalled] = useState(false);
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    // Use axios to send request
    axios
      .post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: `${prompt}`,
          n: 4,
          size: '512x512',
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
      .then((res) => {
        // update the state of result to append the newly generated images
        if (res.status === 200 && prompt !== '') {
          // Added condition
          console.log('Sent prompt to OpenAI: ', prompt);
          setResult([...result, ...res.data.data.map((image) => image.url)]);
          setLoading(false);
          setApiCalled(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const generateVariations = async (imageURL) => {
    // Use axios to send request
    axios
      .post(
        'https://api.openai.com/v1/images/variations',
        {
          prompt: `${prompt}`,
          n: 4,
          size: '512x512',
          image_url: `${imageURL}`,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
      .then((res) => {
        // update the state of result to append the newly generated images
        if (res.status === 200 && prompt !== '') {
          // Added condition
          console.log('Sent prompt to OpenAI: ', prompt);
          setVariations([...variations, ...res.data.data.map((image) => image.url)]);
          setLoading(false);
          setApiCalled(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => setShow(false);
  const handleShow = (imageURL) => {
    setShow(true);
    setImageURL(imageURL);
    generateVariations(imageURL);
  };
  const handleSaveImage = (imageURL) => {
    // TODO: Save image to local storage or database
    const link = document.createElement('a');
    link.download = prompt;
    link.href = imageURL;
    link.target = '_blank';
    link.click();
  };

  const handleUserInput = (input) => {
    setPrompt(input);
    if (prompt !== '') {
      generateImage();
    }
  };

  const handleReload = () => {
    if (prompt === '') {
      setPrompt(userInputs[0]);
      generateImage();
    }
  };

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>
            AI Assistant for Efficient AI Text to Image | Asst.ai
          </title>
          <meta
            name="description"
            content="Asst.ai's advanced AI technology makes article writing a breeze. Our AI assistant helps you research, write, and edit your articles with ease. Try Asst.ai now and see the difference for yourself."
          />
        </Helmet>
        <Container>
          <Row className="mt-5">
            <Col md={{ span: 8, offset: 2 }}>
              <h1>Image Generator Asst</h1>
              <br />
              <br />
              <h3>Choose from the following prompts to see how it works:</h3>
              <Row>
                {userInputs.map((input, index) => (
                  <Col md={3} className="my-2" key={index}>
                    <Button
                      variant="secondary gradient"
                      size="sm"
                      type="submit"
                      key={index}
                      onClick={() => handleUserInput(input)}
                    >
                      {input}
                    </Button>
                  </Col>
                ))}
                <Col md={3} className="my-2">
                  <Button
                    variant="secondary gradient"
                    size="sm"
                    type="submit"
                    onClick={handleReload}
                  >
                    Reload
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>{' '}
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Form>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="imageInput"
                    style={{ height: '50px' }}
                    placeholder={placeholder}
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                  />

                  <Form.Text className="text-muted">
                    Enter as much information as possible for a more accurate
                    image
                  </Form.Text>
                </Form.Group>
              </Form>
              <br />
              <Button
                onClick={generateImage}
                variant="dark gradient"
                size="lg"
                type="submit"
              >
                Generate New Images
              </Button>
              <br />
              {loading ? (
                <ProgressBar animated variant="info" now={100} />
              ) : (
                <div></div>
              )}{' '}
              <br />
              <br />
              {result.length > 0 || apiCalled ? (
                <Row>
                  {result.map((image, index) => (
                    <Col md={3} className="my-2" key={index}>
                      <Card>
                        <Card.Img
                          variant="top"
                          src={image}
                          onClick={() => handleShow(image)}
                        />
                        <Button
                          onClick={() => handleSaveImage(image)}
                          variant="light gradient"
                          size="sm"
                          type="submit"
                        >
                          Save
                        </Button>
                      </Card>
                    </Col>
                  ))}
                  {variations.map((image, index) => (
                    <Col md={3} className="my-2" key={index}>
                      <Card>
                        <Card.Img
                          variant="top"
                          src={image}
                          onClick={() => handleShow(image)}
                        />
                        <Button
                          onClick={() => handleSaveImage(image)}
                          variant="light gradient"
                          size="sm"
                          type="submit"
                        >
                          Save
                        </Button>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div style={{ display: apiCalled ? 'none' : 'block' }}>
                  <p>
                    <small>No results, yet. Images will appear here.</small>
                  </p>
                </div>
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
      </HelmetProvider>
    </div>
  );
}

export default ImageGenerator;
