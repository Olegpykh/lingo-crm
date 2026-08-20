'use client';

import { TableCell } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface DroppableCellProps {
  id: string;
  children: ReactNode;
}

export default function DroppableCell({ id, children }: DroppableCellProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <TableCell
      ref={setNodeRef}
      sx={{
        height: 80,
        width: 150,
        p: 1,
        border: '1px solid #e0e0e0',
        bgcolor: isOver ? 'action.hover' : 'background.paper',
        transition: 'background-color 0.15s',
      }}
    >
      {children}
    </TableCell>
  );
}