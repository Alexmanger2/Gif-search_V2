import React,{useState,Fragment} from 'react';
import axios from 'axios';

function GifSearch() {
  
    
    const [trendingData,setTrendingData] = useState([]);
    const [toggleTrend,setToggleTrend] = useState(false);

    const [search,setSearch] = useState("");
    const [searchData,setSearchData] = useState([]);
    const [toggleSearch,setToggleSearch] = useState(false);

    const [randomData,setRandomData] = useState([]);
    const [toggleRandom,setToggleRandom] = useState(false);
        

    const getTrending = async () => {
       const API_KEY = "HJ7Y0riiQ86ysZe4Vh0Qq8uNClbRBAJS";
       const url = "http://api.giphy.com/v1/gifs/trending?api_key=" + API_KEY;
           try {
                   const response = await axios.get(url)
                   setTrendingData(response.data.data)
                   console.log(response.data)
                   if(response.status === 200){
                    setToggleTrend(!toggleTrend);
                    setToggleSearch(false)
                    setToggleRandom(false)
                }
           } catch (error) {
               console.error(error.message)
               setToggleTrend(false);
           }
   
    }
  

    const getGifs = async() => {
            if(search.length !== 0){
        try {
            const API_KEY = "HJ7Y0riiQ86ysZe4Vh0Qq8uNClbRBAJS";  //could use env
            const url = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + API_KEY;
            const response = await axios.get(url)
            console.log(response)
            setSearchData(response.data.data)
            if(response.status === 200){
            setToggleSearch(!toggleSearch)
            setToggleRandom(false)
            setToggleTrend(false)}
        } catch (error) {
            console.error(error.message)
            setToggleSearch(false)
        }
            }else{
                setToggleSearch(false) 
            }
    
    
    }

    const getRandom = async () => {
        try {
                const API_KEY = "HJ7Y0riiQ86ysZe4Vh0Qq8uNClbRBAJS";
                const url = "http://api.giphy.com/v1/gifs/random?api_key=" + API_KEY;
                const response = await axios.get(url)
                setRandomData(response.data.data.images.original.url)
                console.log(response)
                if(response.status === 200){
                    setToggleRandom(!toggleRandom)
                    setToggleSearch(false)
                    setToggleTrend(false)
                }
    
        } catch (error) {
            console.error(error.message)
            setToggleRandom(false)
        }
    }
    
  
  return <Fragment>



<div className='mainButtons'>
        <input type="text" className='inputSearch' onChange={e => setSearch(e.target.value)}/>
        <button type="button" className='searchButton' onClick={getGifs}>Search</button>
        <button type="button" className='trendButton' onClick={getTrending } >Trending</button>
        <button type="button" className='randomButton' onClick={getRandom}>Random</button>
</div>

<br/>

            {toggleSearch ? searchData.map(data => {
                return(
                    <div key={data.id} className="card">
                       <img alt="" src={data.images.original.url}/>
                       </div>
                )
            }):null}


        {toggleTrend ? trendingData.map(data => {
            return(
                  <div className="card">  <img alt="" src={data.images.original.url} className="srcTag"/> </div>
            )
        }): null}

        
        {
            toggleRandom ? 
                <div className="card" id="randomId">
                    <img alt="" src={randomData}/>
                </div>
            : null
        }







  </Fragment>
}

export default GifSearch;
