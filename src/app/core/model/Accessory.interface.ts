export interface Accessory {
  id: number,
  name: string,
  description: string,
  price: number
  isSuggestion?: boolean;
  quantity?: number;
}
