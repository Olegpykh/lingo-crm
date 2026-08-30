'use client';

import { Container, Typography, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
      <Typography
        variant="h1"
        sx={{ fontSize: 96, fontWeight: 700, color: 'primary.main', mb: 1 }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        {t('title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('description')}
      </Typography>
      <Box>
        <Button
          component={Link}
          href="/"
          variant="contained"
          startIcon={<HomeIcon />}
        >
          {t('backToDashboard')}
        </Button>
      </Box>
    </Container>
  );
}
