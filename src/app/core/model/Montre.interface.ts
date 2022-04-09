export interface Montre {
  id : number;
  description: string;
  brand: Brand;
  model: string;
  reference : string;
  complication: string;
  movement : any;
  genre: string;
  strap: string;
  dimensions: string;
  year: number;
  price: number;
  case: string;
  dial: string;
  glass:string;
}

export interface Brand {
  name: string
}
