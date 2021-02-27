// https://developer.musixmatch.com/documentation/api-reference/track-search

import React from 'react';
// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { Context } from "../../context";

//By using this Hook, you tell React that your component needs to do something after render.

const Search = () => {
    return (
        <div className="card card-body mb-4 p-4">
            <h1 className="display-4 text-center">
                <i className="fas fa-music" /> Search For A Song
                </h1>

            <p className="lead text-center">And I will grade your shitty taste</p>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Song title..."
                        name="userInput"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Artist..."
                        name="userInput"
                    />
                </div>

                <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
                    Get Track Lyrics
                    </button>
            </form>
        </div>
    );
}

export default Search;