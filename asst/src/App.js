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
import ImageGenerator from './components/Designer';

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <main className="App">
    
        <Navigation/>

        <Routes>

          
          <Route path='/' exact element={<Home/>} />
          <Route path='/xmas-card-writer' exact element={<Xmas/>} />
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
  );
}

export default App;
