export interface Montre {
  id : number;
  description: string;
  brand: Brand;
  model: string;
  complication: string;
  movement : any;
  genre: string;
  strap: string;
  dimensions: string;
  available: boolean;
  hands: string;
  crown: string;
  year: number;
  price: string;
  case: string;
  dial: string;
  glass:string;
  certificat: string;
  photos: Photo[];
}

export interface Brand {
  id: number,
  name: string
}

export interface Photo {
  id: number;
  path: string;
  is_video: boolean;
  watch_id: number;
  isPhotoDetail: boolean;
}
