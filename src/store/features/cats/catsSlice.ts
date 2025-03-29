import { createSlice } from '@reduxjs/toolkit';
import type { CatsState } from '@/types';
import { fetchCats } from './catsApi';

const initialState: CatsState = {
  items: [],
  favorites: [],
  loading: false,
  error: null
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
        console.log(' isFavorites true', cat);
        state.favorites = state.favorites.filter((favorite) => favorite.id !== cat.id);
      } else {
        console.log(' push cat', cat);
        state.favorites.push(cat);
      }
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
        console.log(' state.items', state.items);
        state.loading = false;
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cats';
      });
  }
});

export const { addCat, deleteCat, toggleFavorites } = catsSlice.actions;
export default catsSlice.reducer; 