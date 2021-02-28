import './Home.css';
import arr from './arr.png'
function Home() {

  return (
      <div className="homeWrapper">
          <h1 className="homeInt">Welcome to Moody Melody</h1>
          <h2 className="homeSub">An AI powered Spotify library mood analyser</h2>
          <img className="arrow" src={arr} alt="s"/>
          <p className='startHere'>START HERE</p>
      </div>
  );
}

export default Home;