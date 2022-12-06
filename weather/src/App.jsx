import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Weather from './Components/Weather';
import WeatherDays from './Components/WeatherDays';

function App() {
  return (
    <React.Fragment>
<Routes>
<Route path='/' element={ <Weather/>}/>
<Route path='/weather' element={ <WeatherDays/>}/>
</Routes>
      
    </React.Fragment>
  );
}

export default App;
