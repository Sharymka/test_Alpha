import { createSlice } from '@reduxjs/toolkit';
import type { CatsState } from '@/types';
import { fetchCats } from './catsApi';

const initialState: CatsState = {
  items: [],
  favorites: [],
  loading: false,
  error: null,
  isInitialized: false
};

export const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    addCat: (state, action) => {
      state.items.push(action.payload);
    },
    deleteCat: (state, action) => {
      state.items = state.items.filter(cat => cat.id !== action.payload);
    },
    toggleFavorites: (state, action) => {
      const cat = action.payload;

      const isFavorites = state.favorites.some((favorite) => cat.id === favorite.id);

      if (isFavorites) {
        state.favorites = state.favorites.filter((favorite) => favorite.id !== cat.id);
      } else {
        state.favorites.push(cat);
      }
    },
    updateCat: (state, action) => {
      const index = state.items.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        const favIndex = state.favorites.findIndex(cat => cat.id === action.payload.id);
        if (favIndex !== -1) {
          state.favorites[favIndex] = action.payload;
        }
      }
    },
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

export const { addCat, deleteCat, toggleFavorites, updateCat } = catsSlice.actions;
export default catsSlice.reducer; 