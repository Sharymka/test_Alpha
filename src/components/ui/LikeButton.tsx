import React from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorites } from '@/store/features/cats/catsSlice';
import type { Cat } from '@/types';
import type { RootState } from '@/store';

interface LikeButtonProps {
  catItem: Cat;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ catItem }) => {
  const dispatch = useDispatch();
  const isLiked = useSelector((state: RootState) => 
    state.cats.favorites.some(favorite => favorite.id === catItem.id)
  );

  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleFavorites(catItem));
  };

  return (
    <IconButton 
      onClick={handleLike}
      sx={{ color: isLiked ? 'grey.500' : 'grey.500' }}
      size="small"
    >
      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}; 