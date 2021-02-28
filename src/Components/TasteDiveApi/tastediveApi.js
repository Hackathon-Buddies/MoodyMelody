// https://tastedive.com/read/api
import './tastdive.css';
import { useState } from 'react';
import XMLHttpRequest from 'xmlhttprequest';

const data = { "Similar": { "Info": [{ "Name": "Imagine Dragons", "Type": "music" }], "Results": [{ "Name": "Bastille", "Type": "music" }, { "Name": "Ed Sheeran", "Type": "music" }, { "Name": "Lorde", "Type": "music" }, { "Name": "Hozier", "Type": "music" }, { "Name": "Of Monsters And Men", "Type": "music" }, { "Name": "The Neighbourhood", "Type": "music" }, { "Name": "Macklemore & Ryan Lewis", "Type": "music" }, { "Name": "Lana Del Rey", "Type": "music" }, { "Name": "Ellie Goulding", "Type": "music" }, { "Name": "Bruno Mars", "Type": "music" }, { "Name": "Tom Odell", "Type": "music" }, { "Name": "Sam Smith", "Type": "music" }, { "Name": "Alex Clare", "Type": "music" }, { "Name": "One Direction", "Type": "music" }, { "Name": "Onerepublic", "Type": "music" }, { "Name": "Avicii", "Type": "music" }, { "Name": "American Authors", "Type": "music" }, { "Name": "Capital Cities", "Type": "music" }, { "Name": "A Great Big World", "Type": "music" }, { "Name": "Magic!", "Type": "music" }] } }

function TastediveApi() {

  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

  const xhr = new XMLHttpRequest();

  let tasteDate1 = ['2', '3', '4'];
  const [recommendations, setRecommendations] = useState([]);

  const fetchAuthorization = () => {
    const artist = JSON.parse(localStorage.getItem('topSongs'))[0].artist.replace(' ', '%20');
    console.log('getting recommendations for artist -> ', artist);
    const url = `https://thingproxy.freeboard.io/fetch/https://tastedive.com/api/similar?q=grandson`;
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        let tasteDate = [];
        tasteDate = JSON.parse(xhr.responseText).Similar.Results.map(artist => {
          return artist.Name
        })
        // if (tasteDate.length === 0){
        //   tasteDate = data.Similar.Results.map(artist => artist.Name)
        // }
        setRecommendations(tasteDate)
        console.log("a: ", tasteDate)
      }
    }
    xhr.send();
  }

  const recommendationList = recommendations.map(rec => <li> <img src="https://www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png" alt="-" className="playGif" /> {rec}</li>);

  return (
    <div>

      <div onClick={() => fetchAuthorization()} className="recommendMe"> Recommend based on your top songs </div>
      <div>
        <ul className="reco">{recommendationList}</ul>
      </div>

    </div>
  );
}

export default TastediveApi;

