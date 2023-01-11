import React from "react";
import { Component } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";

class Footer extends Component {
    render() {
        return (
            <div>
                <div class="b-example-divider"></div>

<div class="container-fluid">
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="container">
    <div class="col-md-12 d-flex align-items-center">
      <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
       
      </a>
      <small><span class="mb-3 mb-md-0 text-muted">&copy; 2023 Asst.ai | Powered with artificial intelligence from <a href={"https://bywire.agency"} target={"_blank"} className="text-decoration-none">Bywire</a> and <a href="https://openai.com/" className="text-decoration-none">OpenAI</a> </span></small>
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li class="ms-3"><a class="text-muted" href="#"></a></li>
      <li class="ms-3"><a class="text-muted" href="#"></a></li>
      <li class="ms-3"><a class="text-muted" href="#"></a></li>
    </ul>
    </div>
  </footer>
</div>
         
            </div>
        )
    }
}

export default Footer;