import './App.css';
import Spotify from './Components/SpotifyApi/spotifyApi';
import React, { useState } from 'react';


function App() {
  let topSongs = []
  const topSongsHandler = songList => topSongs = songList;
  return (
    <div className="App">
      <h1>Welcome to Moody Melody</h1>
      <Spotify getTopSongs = {topSongsHandler}/>
      <button onClick={() => console.log(topSongs)}>get top songs</button>
    </div>
  );
}

export default App;
