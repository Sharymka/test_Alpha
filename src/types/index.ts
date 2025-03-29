export interface CatBreed {
  name: string;
  origin: string;
}

export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: CatBreed[];
}

export interface CatsState {
  items: Cat[];
  favorites: Cat[];
  loading: boolean;
  error: string | null;
}
