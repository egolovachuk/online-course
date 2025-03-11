import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box
        sx={{
          p: 4,
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Личный кабинет
        </Typography>

        <Typography align="center" paragraph>
          Добро пожаловать в ваш личный кабинет!
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={logout}
          >
            Выйти
          </Button>
        </Box>
      </Box>
      <List>
      {course.modules.map((module) => (
        <ListItem key={module.id}>
          <ListItemText
            primary={module.title}
            secondary={
              module.status === 'completed'
                ? 'Зачёт'
                : module.status === 'in-progress'
                ? 'В процессе'
                : 'Заблокировано'
            }
          />
          {module.status === 'in-progress' && (
            <Button variant="contained" color="primary" size="small">
              Продолжить
            </Button>
          )}
        </ListItem>
      ))}
    </List>
    </Container>
  );
};

export default Dashboard;