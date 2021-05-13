import axios from "axios";
import { TransportType } from "../store/filters";

interface RouteType {
  type: number;
}

const instance = axios.create({
  baseURL: "https://cityride.herokuapp.com/api/",
});

async function GetRouteTypes(): Promise<{ type: TransportType }[]> {
  const routeTypes = await instance.get("/routes/types");
  return routeTypes.data;
}

export { GetRouteTypes };
