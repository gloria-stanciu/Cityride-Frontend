export interface Stop {
  id: string;
  feed_id: string;
  code: string | null;
  name: string;
  desc: string | null;
  lat: string;
  long: string;
  zone_id: number | null;
  stop_url: string | null;
  location_type: number | null;
  parent_station: string | null;
  stop_timezone: Date | null;
  wheelchair_boarding: number | null;
}

export interface Station {
  tripId: string;
  arrivalTime: string;
  departureTime: string;
  stopId: string;
  stopSequence: number;
  shapeDistTraveled: string;
  serviceId: string;
  directionId: number;
  startDate: Date;
  endDate: Date;
  name: string;
}

export interface Position {
  lat: string;
  long: string;
}
