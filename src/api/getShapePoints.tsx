import axios from "axios";
import { Position } from "./interfaces";

const instance = axios.create({
  baseURL: "https://cityride.herokuapp.com/api/",
});

async function getShapePoints(shapeId) {
  const shapePoints = await instance.get(`/shapePoints/${shapeId}`);
  return shapePoints.data;
}

export { getShapePoints };
