import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from './Components/NavBar/Navbar';
import LyricsAPI from './Components/LyricsApi/lyricsApi'

function App() {
  return (
    <div className="App">
      <Router>
        <>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={LyricsAPI}>
              </Route>
            </Switch>
            
          </div>
        </>
      </Router>
    </div>
  );
}

export default App;
