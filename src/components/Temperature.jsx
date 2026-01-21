


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../components/styles.css";

const Temperature = () => {

    const [temp, setTemp] = useState(null);
    const [message, setMessage] = useState("");

    const handleBtnclickChoice = () => {
        // alert(message);
         const city = message;

        // Step 1: City → Lat/Lon
        axios.get(
            "https://geocoding-api.open-meteo.com/v1/search",
            { params: { name: city, count: 1 } }
        )
            .then(res => {
                const { latitude, longitude } = res.data.results[0];

                // Step 2: Weather
                return axios.get(
                    "https://api.open-meteo.com/v1/forecast",
                    {
                        params: {
                            latitude,
                            longitude,
                            current_weather: true
                        }
                    }
                );
            })
            .then(res => {
                setTemp(res.data.current_weather.temperature);
            })
            .catch(err => console.error(err));

    };

    useEffect(() => {
        const city = "thanjavurabcd";

        // Step 1: City → Lat/Lon
        axios.get(
            "https://geocoding-api.open-meteo.com/v1/search",
            { params: { name: city, count: 1 } }
        )
            .then(res => {
                const { latitude, longitude } = res.data.results[0];

                // Step 2: Weather
                return axios.get(
                    "https://api.open-meteo.com/v1/forecast",
                    {
                        params: {
                            latitude,
                            longitude,
                            current_weather: true
                        }
                    }
                );
            })
            .then(res => {
                setTemp(res.data.current_weather.temperature);
            })
            .catch(err => console.error(err));

    }, []);

    return (
        <div>
            <div className="head">
                <Link to="/">Main Page</Link>
                <Link to="/temperature">Weather Page</Link>
                
                <br />
                <h3>Welcome to API access via Axios - Users Page!</h3>
            </div>
            <br />
            <input
                type="text"
                placeholder="Enter City"
                style={{ width: 400, height: 40, padding: 5, color: "blue", backgroundColor: "yellow", fontSize: 20 }}
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                    localStorage.setItem("msg", e.target.value);
                }}

            />
   <button onClick={handleBtnclickChoice} class="glass-btn">Proceed</button>

            <h1>Temperature in {message} is {temp} °C</h1>
        </div>
    );
};

export default Temperature;
