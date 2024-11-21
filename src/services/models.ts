export interface Restaurant {
  id?: number;
  name: string;
  neighborhood?: string;
  photograph?: string;
  address?: string;
  latlng: LatLng;
  cuisine_type?: string;
  operating_hours?: OperatingHours;
  reviews: Review[];
}

interface LatLng {
  lat: number;
  lng: number;
}

interface OperatingHours {
  Monday?: string;
  Tuesday?: string;
  Wednesday?: string;
  Thursday?: string;
  Friday?: string;
  Saturday?: string;
  Sunday?: string;
}

interface Review {
  name?: string;
  date?: string;
  rating?: number;
  comments?: string;
}
