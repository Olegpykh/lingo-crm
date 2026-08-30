'use client';

import { useState } from 'react';
import {
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { useTranslations } from 'next-intl';

export default function NotificationsSection() {
  const t = useTranslations('settings');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        {t('notifications')}
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
          />
        }
        label={t('emailNotifications')}
        sx={{ display: 'flex', justifyContent: 'space-between', ml: 0, mb: 1 }}
      />

      <Divider sx={{ my: 1 }} />

      <FormControlLabel
        control={
          <Switch
            checked={weeklyDigest}
            onChange={(e) => setWeeklyDigest(e.target.checked)}
          />
        }
        label={t('weeklyDigest')}
        sx={{ display: 'flex', justifyContent: 'space-between', ml: 0 }}
      />
    </Paper>
  );
}
