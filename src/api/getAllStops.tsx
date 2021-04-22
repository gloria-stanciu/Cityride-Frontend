import axios from "axios"

const instance = axios.create({
    baseURL: 'https://cityride.herokuapp.com/api/', 
  });
  

async function GetAllStops(){
    const stops = await instance.get('/stops')
    return stops.data
}

export {GetAllStops}