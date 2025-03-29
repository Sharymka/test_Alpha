import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteButtonProps {
  catId: string;
  onDelete: (catId: string) => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ catId, onDelete }) => {
  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete(catId);
  };

  return (
    <IconButton 
      onClick={handleDelete}
      sx={{ color: 'grey.500' }}
      size="small"
    >
      <DeleteIcon />
    </IconButton>
  );
}; 