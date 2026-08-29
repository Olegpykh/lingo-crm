'use client';

import { useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  Box,
  TextField,
  InputAdornment,
  Chip,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StudentCard from '@/components/StudentCard';
import { students } from '@/data/students';
import { levelPalette } from '@/lib/colors';

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

export default function StudentsPage() {
  const [query, setQuery] = useState('');
  const [activeLevel, setActiveLevel] = useState<string | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
    const matchesLevel = activeLevel ? s.level === activeLevel : true;
    return matchesQuery && matchesLevel;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Schüler:innen
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {filteredStudents.length} von {students.length} Schüler:innen
      </Typography>


      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}
      >
        <TextField
          placeholder="Nach Namen suchen..."
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ width: 280 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}
      >
        <Chip
          label="Alle"
          size="small"
          onClick={() => setActiveLevel(null)}
          sx={{
            fontWeight: 600,
            bgcolor: activeLevel === null ? 'text.primary' : 'action.hover',
            color: activeLevel === null ? 'background.paper' : 'text.secondary',
          }}
        />
        {levels.map((level) => (
          <Chip
            key={level}
            label={level}
            size="small"
            onClick={() => setActiveLevel(activeLevel === level ? null : level)}
            sx={{
              fontWeight: 600,
              bgcolor:
                activeLevel === level
                  ? levelPalette[level].solid
                  : 'action.hover',
              color: activeLevel === level ? 'white' : 'text.secondary',
              transition: 'background-color 0.15s, color 0.15s',
            }}
          />
        ))}
      </Stack>

      {filteredStudents.length === 0 ? (
        <Box sx={{ py: 10, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Keine Treffer
          </Typography>
          <Typography variant="body2">
            Für &quot;{query}&quot; wurde niemand gefunden.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredStudents.map((student) => (
            <Grid key={student.name} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <StudentCard student={student} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
