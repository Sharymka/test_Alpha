import React from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/store/features/cats/catsSlice';
import type { RootState } from '@/store';

interface LikeButtonProps {
  catId: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ catId }) => {
  const dispatch = useDispatch();
  const isLiked = useSelector((state: RootState) => 
    state.cats.favorites.some(favorite => favorite.id === catId)
  );

  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleFavorite(catId));
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