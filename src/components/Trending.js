import React,{useState,useEffect,Fragment} from 'react';
import './Trending.css';
import axios from 'axios';

function Trending() {
 
    const [trending,setTrending] = useState("");
    const [trendingData,setTrendingData] = useState([]);
 const getTrending = async () => {
    const API_KEY = "HJ7Y0riiQ86ysZe4Vh0Qq8uNClbRBAJS";
    const url = "http://api.giphy.com/v1/gifs/trending?api_key=" + API_KEY;
        try {
                const response = await axios.get(url)
                setTrendingData(response.data.data)
                console.log(response.data)

        } catch (error) {
            console.error(error.message)
        }

 }
 
 
 
 
 
 
 
 
 
 
    return <Fragment>

 <div>
        <input type="text" onChange={e => setTrending(e.target.value)}/>
        <button type="button" onClick={getTrending } >Search</button>
</div>

<div>

        {trendingData.map(data => {
            return(
                  <div className="card">  <img src={data.images.original.url} className="srcTag"/> </div>
            )
        })}

</div>



    </Fragment>;
}

export default Trending;
