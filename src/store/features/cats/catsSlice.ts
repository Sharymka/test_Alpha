import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Cat } from '@/types';
import { fetchCats } from './catsApi';

interface CatsState {
  items: Cat[];
  favorites: Cat[];
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: CatsState = {
  items: [],
  favorites: [],
  loading: false,
  error: null,
  isInitialized: false,
  currentPage: 1,
  itemsPerPage: 10
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    setCats: (state, action: PayloadAction<Cat[]>) => {
      state.items = action.payload;
      state.isInitialized = true;
    },
    addCat: (state, action: PayloadAction<Cat>) => {
      state.items.unshift(action.payload);
    },
    updateCat: (state, action: PayloadAction<Cat>) => {
      const index = state.items.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteCat: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(cat => cat.id !== action.payload);
      state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const cat = state.items.find(cat => cat.id === action.payload);
      if (cat) {
        const isFavorite = state.favorites.some(fav => fav.id === action.payload);
        if (isFavorite) {
          state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
        } else {
          state.favorites.push(cat);
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCats.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.isInitialized = true;
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cats';
      });
  }
});

export const { 
  setCats, 
  addCat, 
  updateCat, 
  deleteCat, 
  toggleFavorite,
  setLoading,
  setError,
  setCurrentPage,
  setItemsPerPage
} = catsSlice.actions;

export default catsSlice.reducer; 