import axios from "axios";

const instance = axios.create({
  baseURL: "https://cityride.herokuapp.com/api/",
});

async function GetAllStops(vehicleType) {
  const routes = await instance.get(`/routes?type=${vehicleType}`);
  return routes.data;
}

export { GetAllStops };
