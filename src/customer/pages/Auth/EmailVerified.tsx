import React from 'react';
import { Box, Paper, Typography, Button, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const EmailVerified = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'none',
          }}
        >
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              bgcolor: 'success.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
              animation: 'scaleIn 0.5s ease-out'
            }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: 80,
                color: 'white'
              }}
            />
          </Box>

          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: 'success.main',
              mb: 2,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            Xác Thực Email Thành Công!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 4,
              textAlign: 'center',
              maxWidth: '400px'
            }}
          >
            Email của bạn đã được xác thực thành công. Bạn có thể đăng nhập và sử dụng tất cả tính năng của nền tảng.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/login')}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontSize: '1.1rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
              },
              transition: 'all 0.2s'
            }}
          >
            Tiếp Tục Đăng Nhập
          </Button>
        </Paper>
      </Box>

      <style>
        {`
          @keyframes scaleIn {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default EmailVerified;
