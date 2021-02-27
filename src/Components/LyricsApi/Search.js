// https://developer.musixmatch.com/documentation/api-reference/track-search

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// import { Context } from "../../context";



const Search = () => {
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');


    const onSearch = () => {
        const apiKey = 'e6fa00dce5aa8dcca85691817a667544';
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: 'apikey',
                password: apiKey
            }
        }
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_artist=${artist}&q_track=${song}`, config)
            .then(res => { console.log(res) }
            )
            .catch(err => console.log(err));

    }



    return (
        <div className="card card-body mb-4 p-4">
            <h1 className="display-4 text-center">
                <i className="fas fa-music" /> Search For A Song
                </h1>

            <p className="lead text-center">And I will grade your shitty taste</p>

            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song title..."
                    name="songInput"
                    value={song}
                    onChange={e => setSong(e.target.value)}
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Artist..."
                    name="artistInput"
                    value={artist}
                    onChange={e => setArtist(e.target.value)}
                />
            </div>

            <button className="btn btn-primary btn-lg btn-block mb-5" onClick={onSearch}>
                Get Track Lyrics
                </button>

        </div>
    );
}

export default Search;