import React ,{useEffect,useState}from 'react';
import Movie from './components/Movie';


const FEATURED_API = "https://api.themoviedb.org/3/discover/tv?sort_by=popularity_desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=10ab3ca9283568968bb105252f51ffdc&query="

function App() {
  const [movie,setMovie]=useState([]);
  const [searchterm,setSearchterm]=useState('');

  useEffect(()=>{
    getMovies(FEATURED_API);
  },[]);

  const getMovies=(API)=>{
    fetch(API)
    .then(res=>res.json())
    .then(data=>{
      setMovie(data.results);
    });

  }
  
  const handlesubmit=(e)=>{
    e.preventDefault();
    if(searchterm)
    {
      getMovies(SEARCH_API+searchterm);
      setSearchterm('');
    }
  };

  const handlechange=(e)=>{
    setSearchterm(e.target.value);
  };
  return (
    <>
    <header>
    <div className="head">
        <h1>PRIME |<span style={{color:'red'}}>FLIX</span></h1>
    </div>
      <form onSubmit={handlesubmit}>
        
      <input className="search" type="search" placeholder="search ..." 
      value={searchterm}
      onChange={handlechange}/>
      </form>
      </header>  
    <div className="movie-container">
      {movie.length > 0 && movie.map((movie)=>(
      <Movie key={movie.id} {...movie}/>))}
    </div>
    </>
  );
}

export default App;
