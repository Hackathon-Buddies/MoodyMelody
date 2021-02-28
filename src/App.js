import './App.css';
import TastediveApi from './Components/TasteDiveApi/tastediveApi.js';
import Spotify from './Components/SpotifyApi/spotifyApi';
import SentimentApi from './Components/SentimentApi/sentimentApi';
import XMLHttpRequest from 'xmlhttprequest';
import React, { useState } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from './Components/NavBar/Navbar';
import LyricsAPI from './Components/LyricsApi/lyricsApi'
import Home from './Components/Home/Home';

function App() {
  const [showingEmotions, setShowingEmotions] = useState(false);
  const [songs, setSongs] = useState([]);
  const [sadness, setsadness] = useState(0)
  const [joy, setjoy] = useState(0)
  const [fear, setfear] = useState(0)
  const [disgust, setdisgust] = useState(0)
  const [anger, setanger] = useState(0)
  let topSongs = [];
  let topLyrics = [];
  let topSentiments = {
    sadness: sadness,
    joy: joy,
    fear: fear,
    disgust: disgust,
    anger: anger
  };
  const topSongsHandler = songList => {
    topSongs = songList;
    localStorage.setItem('topSongs', JSON.stringify(songList));
    topLyrics = [];
    if (Array.isArray(songList) && songList.length > 0) {
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

  const getEmotionsFromArray = arr => {
    let combined = '';
    arr.map(text => {
      if (text && typeof text.data.lyrics === 'string') {
        combined += text.data.lyrics;
      }
    })
    if (combined !== '') {
      getEmotion(combined);
    }
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
        topSentiments = res ? res.data.emotion.document.emotion : null;
        localStorage.setItem('topSongs', JSON.stringify(topSentiments));
        console.log("finihied being emotional");
        setShowingEmotions(true);
        console.log("is it showing it tho ? ", showingEmotions);
        console.log('current sentiments ', topSentiments);
        setjoy(topSentiments.joy);
        setanger(topSentiments.anger);
        setdisgust(topSentiments.disgust);
        setfear(topSentiments.fear);
        setsadness(topSentiments.sadness);
        setSongs(topSongs);
      });
    } catch (err) {
      console.log(err);
      topSentiments = null;
      localStorage.setItem('topSongs', JSON.stringify(topSentiments));
    }
  }

  const mapEmotionToColor = emotion => {
    switch (emotion) {
      case 'sadness': return '#5c9bff';
      case 'joy': return '#d7d964'
      case 'fear': return '#a675bf';
      case 'disgust': return '#7dad82'
      case 'anger': return '#c76a65';
      default: return 'white';
    }
  }





  const displayEmotions = showingEmotions ? (console.log('showing emotion chart'), Object.keys(topSentiments).map(emotion => {
    const colour = mapEmotionToColor(emotion);
    console.log('dealt with colour -> ', colour);
    return <div key={emotion} className="sentimentBlocks" style={{ 'background-color': colour }}><div className="innerBlocks">{emotion} <br /> {(topSentiments[emotion] * 100).toFixed(3) + "%"}</div></div>
  })) : (console.log('Failed at having any emotions on the chart'), null)

  const displayTopSongs = songs.map(song => {
    return <span className="songSpan"> {song.title} - {song.artist}, </span>
  });

  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <Spotify getTopSongs={topSongsHandler} />
        <div className="container">
          <Switch>
            <Route exact path="/">{
              <>
              <Home />
              {displayEmotions}
              <div style={{marginTop: "50px"}}> <h2>Sentiments based on the following songs from your library:</h2> {displayTopSongs}</div>
              </>
            }</Route>
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