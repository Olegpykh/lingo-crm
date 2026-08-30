'use client';

import {
  Typography,
  Paper,
  Box,
  Switch,
  FormControlLabel,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useAppStore, accentColors } from '@/store/useAppStore';

export default function AppearanceSection() {
  const t = useTranslations('settings');
  const mode = useAppStore((state) => state.mode);
  const accent = useAppStore((state) => state.accent);
  const toggleColorMode = useAppStore((state) => state.toggleColorMode);
  const setAccent = useAppStore((state) => state.setAccent);

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
        {t('appearance')}
      </Typography>

      <FormControlLabel
        control={
          <Switch checked={mode === 'dark'} onChange={toggleColorMode} />
        }
        label={t('darkMode')}
        sx={{ display: 'flex', justifyContent: 'space-between', ml: 0, mb: 2 }}
      />

      <Divider sx={{ mb: 2 }} />

      <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>
        {t('accentColor')}
      </Typography>
      <ToggleButtonGroup
        value={accent}
        exclusive
        onChange={(_, value) => value && setAccent(value)}
        size="small"
      >
        {(Object.keys(accentColors) as Array<keyof typeof accentColors>).map(
          (key) => (
            <ToggleButton key={key} value={key} sx={{ p: 1, border: 'none' }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: accentColors[key],
                  outline: accent === key ? '2px solid' : 'none',
                  outlineColor: 'text.primary',
                  outlineOffset: '2px',
                }}
              />
            </ToggleButton>
          )
        )}
      </ToggleButtonGroup>
    </Paper>
  );
}
