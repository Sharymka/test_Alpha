import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch } from 'react-redux';
import { toggleFavorites } from '@/store/features/cats/catsSlice';

interface LikeButtonProps {
  catId: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ catItem }) => {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLiked(!isLiked);
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