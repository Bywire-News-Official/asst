import logo from '../favicon.png'
import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'

class Navigation extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" variant='light' sticky='top' expand="md" collapseOnSelect>
                <Container>   
                    <Navbar.Brand href="/">
                        <img
                        src={logo}
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                        width={'90px'}
                        />
                    </Navbar.Brand>
                  
                    <Navbar.Toggle />

                    <Navbar.Collapse >
                        
                    <Nav className="me-auto">
                        
                        
                        
                        <NavDropdown title="AI Writer" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="article-writer" active={window.location.pathname === '/article-writer'}>Article Writer</NavDropdown.Item>
                            <NavDropdown.Item href="copywriter" active={window.location.pathname === '/copywriter'}>Copywriter</NavDropdown.Item>
                            <NavDropdown.Item href="summary" active={window.location.pathname === '/summary'}>Summary Writer</NavDropdown.Item>
                            <NavDropdown.Item href="xmas-card-writer" active={window.location.pathname === '/xmas-card-writer'}>Card Writer</NavDropdown.Item>
                            <NavDropdown.Item href="article-news-writer" active={window.location.pathname === '/article-news-writer'}>Article Spinner</NavDropdown.Item>
                            <NavDropdown.Item href="article-proofer" active={window.location.pathname === '/article-proofer'}>Proofer</NavDropdown.Item>
                            <NavDropdown.Item href="tweet-writer" active={window.location.pathname === '/tweet-writer'}>Tweet Writer</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="ai-designer" className="mx-2" active={window.location.pathname === '/ai-designer'}>Image Generater</Nav.Link>
                        <Nav.Link href="about-asst" className="mx-2" active={window.location.pathname === '/about-asst'}>About</Nav.Link>
                    </Nav>

                    <Nav>
                        <Nav.Link href="https://bywire.agency/" target={"_blank"} className="mx-3">Bywire</Nav.Link>
                        <Nav.Link href="https://bywire.news/" target={"_blank"} className="mx-3">Blog</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
export default Navigation;