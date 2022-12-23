import logo from '../favicon.png'
import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, Container } from 'react-bootstrap'

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
                        width={'125px'}
                        />
                    </Navbar.Brand>
                  
                    <Navbar.Toggle />

                    <Navbar.Collapse >
                        
                    <Nav className="me-auto">
                        
                        <Nav.Link href="xmas-card-writer" className="mx-2" active={window.location.pathname === '/xmas-card-writer'}>Christmas Card Writer</Nav.Link>
                        <Nav.Link href="article-writer" className="mx-2" active={window.location.pathname === '/article-writer'}>Article Writer</Nav.Link>
                        <Nav.Link href="article-news-writer" className="mx-2" active={window.location.pathname === '/article-news-writer'}>News as New</Nav.Link>
                        <Nav.Link href="article-proofer" className="mx-2" active={window.location.pathname === '/article-proofer'}>Proof Anything</Nav.Link>
                        <Nav.Link href="tweet-writer" className="mx-2" active={window.location.pathname === '/tweet-writer'}>Tweet Writer</Nav.Link>
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