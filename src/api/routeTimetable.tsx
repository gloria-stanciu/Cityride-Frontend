import axios from "axios";
import { Station } from "./interfaces";
// import { TransportType } from "../store/filters";

// interface RouteType {
//   type: number;
// }

const instance = axios.create({
  baseURL: "https://cityride.herokuapp.com/api/",
});

async function getTimetable(
  routeId: string,
  direction: 0 | 1,
  date?: Date
): Promise<Station[]> {
  const dateTime = date ? date.toISOString() : new Date().toISOString();
  const newDate = dateTime.slice(0, -2);
  const timetable = await instance.get(
    `/routes/${routeId}/timetables?time=${dateTime}&direction=${direction}`
  );
  return timetable.data;
}

export { getTimetable };
