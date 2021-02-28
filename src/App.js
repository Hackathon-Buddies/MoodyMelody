import './App.css';
import TastediveApi from './Components/TasteDiveApi/tastediveApi.js';
import Spotify from './Components/SpotifyApi/spotifyApi';
import SentimentApi from './Components/SentimentApi/sentimentApi';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from './Components/NavBar/Navbar';
import LyricsAPI from './Components/LyricsApi/lyricsApi'

function App() {
  let topSongs = []
  const topSongsHandler = songList => topSongs = songList;
  return (
        
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/lyrics">{<LyricsAPI />}</Route>
              <Route exact path="/recommendation"><TastediveApi /></Route>
              <Route exact path="/"><Spotify getTopSongs={topSongsHandler} /></Route>
              <React exact path="sentiment"><SentimentApi /></React>
            </Switch>

            <button onClick={() => console.log(topSongs)}>get top songs</button>
          </div>
        </React.Fragment>
      </Router>
  );
}

export default App;
