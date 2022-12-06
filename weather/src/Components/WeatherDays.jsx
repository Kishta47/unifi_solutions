import React, { useEffect, useState } from 'react'

export default function WeatherDays() {
    const [lat, setLat] = useState([]);
const [long, setLong] = useState([]);
const [data, setData] = useState([]);

useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=13a162d25dd455e5437d28e92ee2c976`)
      .then(res => res.json())
      .then(result => {
        if(result.message !=="Nothing to geocode"){
            setData(result.list)
        }
        

     
       
      });
        
    }
    fetchData();
  }, [lat,long])
console.log(data)
  return (
    <>
    <div className="container">
        <div className="row m-0  g-4 justify-content-between">
            {data.map((item,index)=>{
                return  <  div className="card col-4" >
                <div className="card-body">
                <h5 className="card-title">date: {item.dt_txt} </h5>
              
                <h6 className="card-subtitle mb-2 ">Temp: {item.main.temp}</h6>
                <h6 className="card-subtitle mb-2 ">Weather: {item.weather[0].main}</h6>
               
               
               </div>
                  </div>
            })}
     
        </div>
    </div>
    </>
  )
}
