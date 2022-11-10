export interface Filtre {
  nom : string,
  values: FiltreObject[]
}

export interface FiltreObject {
  id?: number,
  name: string,
  estCoche: boolean
}
