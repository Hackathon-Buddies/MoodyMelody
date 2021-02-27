// https://tastedive.com/read/api
import { useState } from 'react';
import XMLHttpRequest from 'xmlhttprequest';


function TastediveApi() {

  const [isLoading, setBool] = useState(false);

  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

  const xhr = new XMLHttpRequest();

  let tasteDate1 = ['2', '3', '4'];
  const [recommendations, setRecommendations] = useState([]);


  const fetchAuthorization = () => {

    const url = "https://thingproxy.freeboard.io/fetch/https://tastedive.com/api/similar?q=grandson";
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        let tasteDate = [];
        tasteDate = JSON.parse(xhr.responseText).Similar.Results.map(artist => artist.Name)
        setRecommendations(tasteDate)
        console.log("a: ", tasteDate)
      }
    }
    xhr.send();
  }
  const recommendationList = recommendations.map(rec => <li>{rec}</li>);

  return (
    <div>


      <button onClick={() => fetchAuthorization()}> true </button>
      <div>
        <ul>{recommendationList}</ul>
      </div>

    </div>
  );
}

export default TastediveApi;

