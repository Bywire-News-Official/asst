import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ArticleWriter from './components/ArticleWriter';
import ArticleProofer from './components/ArticleProofer';
import Xmas from './components/XmasCardWriter';
import Tweet from './components/TweetWriter';
import Footer from './components/Footer';

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <div className="App">
    
        <Navigation/>

        <Routes>

          
          <Route path='/' exact element={<Home/>} />
          <Route path='/xmas-card-writer' exact element={<Xmas/>} />
          <Route path='/article-writer' exact element={<ArticleWriter/>} />
          <Route path='/article-proofer' exact element={<ArticleProofer/>} />
          <Route path='/tweet-writer' exact element={<Tweet/>} />
      

        </Routes>

        <Footer />

      </div>

    </Router>
  );
}

export default App;
