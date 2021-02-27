// https://tastedive.com/read/api
import { useState } from 'react';
import XMLHttpRequest from 'xmlhttprequest';


function TastediveApi() {

  const [isLoading,setBool] = useState(false);

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    const xhr = new XMLHttpRequest();

    let tasteDate1 = ['2','3','4'];
    let tasteDate = [];

    const setTrue = () =>{
        setBool(true)
    }


    const fetchAuthorization = () => {
             
        const url = "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=grandson";
        xhr.open("GET", url);

        xhr.setRequestHeader("Accept", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               // console.log(JSON.parse(xhr.responseText)) 
               // tasteDate.push(JSON.parse(xhr.responseText).Similar.Results)
                processNames(JSON.parse(xhr.responseText).Similar.Results)
                }
            }
            xhr.send();
            
            
            setTrue()

        }


        const processNames = (names) =>{
          tasteDate.splice(0, tasteDate.length)

          names.forEach(response => {
            tasteDate.push(response.Name)
          });

        }

      
    return (
      <div>

        <button onClick={() => fetchAuthorization()}> true </button>

        {isLoading && tasteDate.length>0 ?  tasteDate.map(artist =>{
          <p> {artist}</p>
          }):<p>nothing</p>}

      </div>
    );
  }
  
  export default TastediveApi;

