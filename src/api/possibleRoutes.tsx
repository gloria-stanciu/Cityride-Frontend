import axios from "axios";
import { StopsWithRoutes } from "../store/routesFromStop";

const instance = axios.create({
  baseURL: "https://cityride.herokuapp.com/api/",
});

async function getPossibleRoutes(id, date?: Date): Promise<StopsWithRoutes[]> {
  const dateTime = date ? date.toISOString() : new Date().toISOString();
  const possibleRoutes = await instance.get(`stops/${id}?time=${dateTime}`);
  return possibleRoutes.data;
}

export { getPossibleRoutes };
