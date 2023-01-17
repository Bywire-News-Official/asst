import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ArticleWriter from './components/ArticleWriter';
import ArticleProofer from './components/ArticleProofer';
import Xmas from './components/XmasCardWriter';
import Tweet from './components/TweetWriter';
import ArticleReWriter from './components/ReWriter';
import Footer from './components/Footer';
import AboutUs from './components/About';
import CopyWriter from './components/Copywriter';
import ImageGenerator from './components/Designer';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Summary from './components/Summary';
import OpenAiPlayground from './components/Playground';
import Chat from './components/Chat';
import Ukfactcheck from './components/Ukfactcheck';
import GreetingCardWriter from './components/GreetingCardWriter';

function App() {
  
  return (
    <HelmetProvider>
    <Router>
      <main className="App">
    
      <Helmet>
      <title>Asst.ai | World's Most Powerful AI Writing and Anything Assistant</title>
      <script defer data-domain="asst.ai" src="https://plausible.io/js/script.js"></script>
      </Helmet>
    
        <Navigation/>

        <Routes>

          
          <Route path='/' exact element={<Home/>} />
          <Route path='/xmas-card-writer' exact element={<Xmas/>} />
          <Route path='/ai-playground' exact element={<OpenAiPlayground/>} />GreetingCardWriter
          <Route path='/uk-fact-check' exact element={<Ukfactcheck/>} />
          <Route path='/greeting-card-writer' exact element={<GreetingCardWriter/>} />
          <Route path='/chat' exact element={<Chat/>} />
          <Route path='/copywriter' exact element={<CopyWriter/>} />
          <Route path='/summary' exact element={<Summary/>} />
          <Route path='/ai-designer' exact element={<ImageGenerator/>} />
          <Route path='/article-writer' exact element={<ArticleWriter/>} />
          <Route path='/article-news-writer' exact element={<ArticleReWriter/>} />
          <Route path='/article-proofer' exact element={<ArticleProofer/>} />
          <Route path='/tweet-writer' exact element={<Tweet/>} />
          <Route path='/about-asst' exact element={<AboutUs/>} />
      

        </Routes>

        <Footer />

      </main>

    </Router>
    </HelmetProvider>
  );
}

export default App;