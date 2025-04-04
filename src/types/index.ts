export interface CatBreed {
  name: string;
  origin: string;
  description: string;
  temperament: string[];
}


export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: CatBreed[];
  isFavorite?: boolean;
}

export interface CatsState {
  items: Cat[];
  favorites: Cat[];
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
  currentPage: number;
  itemsPerPage: number;
}
