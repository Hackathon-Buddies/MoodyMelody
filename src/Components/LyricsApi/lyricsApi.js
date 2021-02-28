import React, { useState } from "react";
import axios from "axios";

const LyricsApi = (props) => {
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [lyrics, setLyrics] = useState('');
    

    const onSearch = () => {
        const lyricsNotFound = setTimeout(() => {
            const songText = song === '' ? '- No song was given' : 'for ' + song;
            const artistText = artist === '' ? '- No artist was given' : 'by ' + artist;
            setLyrics(`Lyrics not found ${songText} ${artistText}`);
        },5000)
        const link = `https://api.lyrics.ovh/v1/${artist}/${song}`
        axios.get(link).then(res => {
            clearTimeout(lyricsNotFound);
            setLyrics(res.data.lyrics);
        });
    }

    const searchList = async () => {
        const songs = JSON.parse(localStorage.getItem("topSongs"));
        const allLyrics = songs.map(song => {
            const lyric = axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
                .then(res => res)
                .catch(err => err)
            return lyric;
        })
        const result = await Promise.all(allLyrics);
        return result;
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

            <button className="btn btn-primary btn-lg btn-block mb-5" onClick={() =>onSearch(song, artist)}>
                Get Track Lyrics
            </button>
            <textarea disabled value={lyrics} cols="30" rows="10"></textarea>
            <button onClick={searchList}>New test</button>
        </div>
    );
}

export default LyricsApi;