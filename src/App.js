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
  let topSentiments = [];
  const topSongsHandler = songList => {
    topSongs = songList;
    localStorage.setItem('topSongs', JSON.stringify(songList));
    topLyrics = [];
    if (Array.isArray(songList) && songList.length > 0){
      searchList();
    }
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
      localStorage.setItem('topLyrics', JSON.stringify(topLyrics));
      console.log("list so far ", topLyrics);
      if (i < topSongs.length - 1) {
        i++;
        searchList();
      } else {
       getEmotionsFromArray(topLyrics);
      }
    })
  };

  const getEmotionsFromArray = async arr => {
    const results = arr.map(async text => {
      if (text && typeof text.data.lyrics === 'string'){
        return await getEmotion(text.data.lyrics);
      } else {
        return null;
      }
    });
    await Promise.all(results).then(res => {
      topSentiments = res;
      localStorage.setItem('topLyrics', JSON.stringify(topSentiments));
    });
  }

  const getEmotion = sentimentalText => {
    const apiKey = 'Q0b2tLfyuz5OdnfFNGgOFqc_W1yAMM596BJsmt6VfWiG';
    const serviceUrl = 'https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/6c379a06-c69a-4551-86c2-bd4f3c2393da/v1/analyze?version=2020-08-01';
    const data = {
      "text": sentimentalText,
      "features": {
        "emotion": {},
      }
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      auth: {
        username: 'apikey',
        password: apiKey
      }
    }
    try {
      axios.post(serviceUrl, data, config).then(res => {
        return res ? res.data.emotion.document.emotion : null;
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

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
          <button onClick={() => console.log(topSongs)}>get top songs</button>
          <button onClick={() => console.log(topSentiments)}>get data</button>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;