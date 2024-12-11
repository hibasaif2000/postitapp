import React, {useEffect, useState} from "react";
import axios from 'axios'

const Location = () =>{
        const [ip, setIp] = useState(null); // State to hold the IP address
        const [geoData, setGeoData] = useState(null); // State to hold geolocation 

    const fetchIpaddress = async()=>{
        try{
            const response = axios.get(`${process.env.REACT_APP_API_IP_ADDRESS}`);
            console.log(response.data.ip)
            setIp(response.data.ip); // Set the IP address in state
        }
        catch(error){
            console.error("Error fetching IP address:", error.message);
        }
    }

    const getGeoLocationData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_KEY}`);
          setGeoData(response.data); // Set geolocation data in state
          console.log("GeoLocation Data:", response.data);
        } catch (error) {
          console.error("Error fetching geolocation data:", error.message);
        }
      };
    
    useEffect(()=>{
        fetchIpaddress()
        getGeoLocationData()
    },[])

    return(
        <div>
            <h4>IP Address: {ip}</h4>
            <div>
              Country: {geoData?.location.country}
              <br />
              Region: {geoData?.location.region}
            </div>
        </div>
    );
}
export default Location;