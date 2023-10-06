import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import './style.css'
function Home() {
    const[data,setData]=useState({
        celcius:10,
        name: 'London',
        humidity:10,
        speed:2,
        image:"/cloud.png"
    })
    const [name,setName]=useState('');
    const [error,setError]=useState('');
    

    const handleClick=()=>{
        if(name!==""){
            const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e94bfc2536b967ddaf613c2ac54605c4&units=metric`;  
        axios.get(apiUrl)
        .then(res=>{
            console.log(res);
            let imagePath="";
            if(res.data.weather[0].main == "Clouds"){
                imagePath="/cloud.png"
            }else if(res.data.weather[0].main == "Clear"){
                imagePath="/clear.png"
            }else if(res.data.weather[0].main == "Rain"){
                imagePath="/rain.png"
            }else if(res.data.weather[0].main == "Drizzle"){
            imagePath="/drizzle.png"
            }else if(res.data.weather[0].main == "Mist"){
                imagePath="/mist.png"
            }else{
                imagePath="/cloud.png"
            }
            setData({...data,celcius: res.data.main.temp,name: res.data.name, humidity: res.data.main.humidity,
            speed:res.data.wind.speed,image: imagePath})
            setError("");
        })
        .catch(err => {
            if(err.response.status==404){
                setError("Invalid City Name")
            }else{
                setError("");
            }
        console.log(err)});
        }
    }
     
  return (
    <div className='container'>
        <div className='weather'>
            <div className='search'>
                <input type="text" placeholder='Enter City Name' style={{color:'black'}}  onChange={e => setName(e.target.value)}/>
                <button><img src="/search.png"  onClick={handleClick} alt="" /></button>
            </div>
            <div className='error'>
                <p>{error}</p>
            </div>
            <div className='winfo'>
                <img src={data.image} alt="" className='icon'/>
                <h1>{Math.round(data.celcius)}°C</h1>
                <h2>{data.name}</h2>
                <div className='details'>
                    <div className='col'>
                        <img src="/humidity.png" alt="" className='icon1'/>
                        <div className='humidity'>
                            <h3>{Math.round(data.humidity)}%</h3>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className='col'>
                        <img src="/wind.png" alt=""className='icon1'/>
                        <div className='wind'>
                            <h3>{Math.round(data.speed)}km/hr</h3>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
  )
}

export default Home