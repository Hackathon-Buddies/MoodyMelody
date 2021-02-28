import './App.css';
import TastediveApi from './Components/TasteDiveApi/tastediveApi.js';
import Spotify from './Components/SpotifyApi/spotifyApi';
import SentimentApi from './Components/SentimentApi/sentimentApi';
import React from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from './Components/NavBar/Navbar';
import LyricsAPI from './Components/LyricsApi/lyricsApi'
import Home from './Components/Home/Home';

function App() {
  let topSongs = [];
  let topLyrics = [];
  const topSongsHandler = songList => {
    topSongs = songList;
    localStorage.setItem('topSongs', JSON.stringify(songList));
    topLyrics = [];
    searchList();
    localStorage.setItem('topLyrics', JSON.stringify(topLyrics))
  }
  let i = 0;

  const searchList = async () => {
    const t = topSongs[i].title;
    const a = topSongs[i].artist
    axios({
      url: `https://thingproxy.freeboard.io/fetch/https://api.lyrics.ovh/v1/${a}/${t}`,
      method: 'GET',
      timeout: 1000
    }).catch((err) => console.log(err)).then(s => {
      if (s) {
        console.log("this is the res ", s);
      }
      topLyrics.push(s ? s : null);
      console.log("list so far ", topLyrics);
      if (i < topSongs.length - 1) {
        i++;
        searchList();
      }
    })
  };

  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <Spotify getTopSongs={topSongsHandler} />
        <div className="container">
          <Switch>
          <Route exact path="/">{<Home />}</Route>
            <Route exact path="/lyrics">{<LyricsAPI />}</Route>
            <Route exact path="/sentiments">{<SentimentApi />}</Route>
            <Route exact path="/recommendations">{<TastediveApi />}</Route>
          </Switch>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;