import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from './Components/NavBar/Navbar';
import LyricsAPI from './Components/LyricsApi/lyricsApi'
import { Provider } from './Components/LyricsApi/context'

function App() {
  return (

    <Provider>
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={LyricsAPI}>
              </Route>
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </Provider>


  );
}

export default App;
