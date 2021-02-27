// https://developer.spotify.com/console/get-recently-played/?limit=10&after=&before=

import React, { useState, useEffect } from 'react';
import { SpotifyApiContext, User, UserTop } from 'react-spotify-api'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'
import Cookies from 'js-cookie'
import './spotifyApi.css'


function Spotify({ getTopSongs }) {

    const [songList, setSongList] = useState([]);
    const [spotifyAuthToken, setSpotifyAuthToken] = useState();
    const token = Cookies.get('spotifyAuthToken')

    const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

    const logout = () => {
        Cookies.remove('spotifyAuthToken', {
            path: dev ? '' : 'react-spotify-auth'
        })
        window.location = dev ? '/' : '/react-spotify-auth'
    }

    return (
        <div className="outerWrapper">

            <SpotifyApiContext.Provider value={token}>
                <UserTop type='tracks'>
                    {(tracks, loading, error) =>
                        tracks && tracks.data
                            ? (getTopSongs(Array.from(tracks.data.items.map((tr) => ({ title: tr.name, artist: tr.artists[0].name })))),
                                tracks.data.items.map((track) => {
                                    return (
                                        <>
                                            {/* <p> song: {track.name} artist: {track.artists[0].name} </p> */}
                                        </>
                                    )
                                }))
                            : <p></p>
                    }
                </UserTop>
            </SpotifyApiContext.Provider>

            {token ?
                <div className='logout' onClick={() => logout()}> Logout </div> :
                <div className='spotifyBtn'>
                    <SpotifyAuth
                        redirectUri={'http://localhost:3000/callback'}
                        clientID='034065fb71374a449d0d58404edb28c0'
                        scopes={[
                            Scopes.userReadPrivate,
                            Scopes.userReadEmail,
                            'user-top-read'
                        ]}
                    />
                </div>
            }
        </div>
    );
}

export default Spotify;