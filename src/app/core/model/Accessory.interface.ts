import {Photo} from "./Montre.interface";

export interface Accessory {
  id: number,
  name: string,
  description: string,
  price: number
  isSuggestion?: boolean;
  quantity?: number;
  photos: Photo[];
  stock: number;
}
