import axios from "axios";

interface SearchedStops {
  id: string;
  lat: string;
  long: string;
  name: string;
}

const instance = axios.create({
  baseURL: "https://cityride.herokuapp.com/api/",
});

async function getStops(name): Promise<SearchedStops[]> {
  const timetable = await instance.get(`stops/filter/by/name?name=%${name}%`);
  return timetable.data;
}

export { getStops };
