import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
const Weather= (props)=> {
let REACT_APP_API_URL = 'https://api.openweathermap.org/data/2.5'
let REACT_APP_API_KEY = "13a162d25dd455e5437d28e92ee2c976";
const [isDark,setIsDark]=useState(false)
const [lat, setLat] = useState([]);
const [long, setLong] = useState([]);
const [data, setData] = useState([]);
const [findWeather,setFindWeather]=useState(false)
useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        if(result.message !=="Nothing to geocode"){
            setData(result)
        }
        
     
       
      });
        let resDaysWeather=await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=13a162d25dd455e5437d28e92ee2c976`)
        console.log(resDaysWeather)
    }
    fetchData();
  }, [lat,long])
  console.log(data);
  return (
    <>

    <div className="container">
        <h1 className='text-center my-4'>Weather App</h1>
        <div className="row m-0 p-0 vh-100 align-items-center justify-content-center">
      {findWeather ?(typeof data.main != 'undefined') ? <div className="card col-6" >
    <div className="card-body">
    <h5 className="card-title">Country: {data.sys.country}</h5>
    <h6 className="card-subtitle mb-2 ">Place: {data.name}</h6>
    <h6 className="card-subtitle mb-2 ">Temp: {data.main.temp}</h6>
    <h6 className="card-subtitle mb-2 ">Weather: {data.weather[0].main}</h6>
    <Button variant="outlined" color="error" onClick={()=>{setFindWeather(false)}} >
        Cancel
      </Button>
   <Link to="/weather" className='btn-warning btn mx-4'> Check another 5 days </Link>
   </div>
</div> : ""  : <div className="row">
    <div className="col-12 text-center">
    <Button variant="outlined" color="success" onClick={()=>{setFindWeather(true)}} >
        Check Your Current Weather
      </Button>
    </div>
</div> }
        
            </div>
            </div>
            </>
  )
}
export default Weather