export interface Filtre {
  nom : string,
  values: FiltreObject[]
}

export interface FiltreObject {
  nom: string,
  estCoche: boolean
}
