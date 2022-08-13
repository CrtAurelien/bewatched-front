import {Montre} from "./Montre.interface";
import {Accessory} from "./Accessory.interface";


export interface Sale {
  id?: number,
  order_number?: number,
  price: number,
  firstname: string,
  lastname: string,
  address: string,
  zipcode: string
  city: string,
  country: string,
  email: string,
  phone: string,
  paymentIsDone?: boolean,
  isShipped?: boolean,
  watchesSale?: any[],
  accessoriesSale?: Accessory[];
}

