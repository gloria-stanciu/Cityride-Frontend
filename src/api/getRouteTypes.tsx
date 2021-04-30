import axios from "axios"

interface RouteType {
    type: number
  }

const instance = axios.create({
    baseURL: 'https://cityride.herokuapp.com/api/', 
  });
  

async function GetRouteTypes(){
    const routeTypes = await instance.get('/routes/routeTypes')
    return routeTypes.data
}

export {GetRouteTypes}