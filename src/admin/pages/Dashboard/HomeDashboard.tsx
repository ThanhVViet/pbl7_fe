import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box, Avatar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { allProducts } from '../../../state/admin/ProductSlice';
import { fetchAllUser } from '../../../state/admin/UserSlice';
import { getAllDeals } from '../../../state/admin/DealSlice';
import { fetchMonthlyOrderStats } from '../../../state/admin/StatSlice';
import { useTheme } from '@mui/material/styles';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { motion } from 'framer-motion';

const cardData: {
  label: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  key: 'products' | 'orders' | 'users' | 'revenue';
}[] = [
  {
    label: 'Tổng sản phẩm',
    icon: <Inventory2Icon fontSize="large" />, 
    color: '#1976d2',
    bg: '#e3f2fd',
    key: 'products',
  },
  // {
  //   label: 'Tổng đơn hàng',
  //   icon: <ShoppingCartIcon fontSize="large" />,
  //   color: '#388e3c',
  //   bg: '#e8f5e9',
  //   key: 'orders',
  // },
  // {
  //   label: 'Tổng người dùng',
  //   icon: <PeopleAltIcon fontSize="large" />,
  //   color: '#fbc02d',
  //   bg: '#fffde7',
  //   key: 'users',
  // },
  {
    label: 'Tổng doanh thu',
    icon: <MonetizationOnIcon fontSize="large" />, 
    color: '#d81b60',
    bg: '#fce4ec',
    key: 'revenue',
  },
];

const HomeDashboard = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { adminProduct } = useAppSelector(state => state);
  const { users } = useAppSelector(state => state.user);
  const { deals } = useAppSelector(state => state.deal);
  const { monthlyStats } = useAppSelector(state => state.stat);
  const { jwt } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(allProducts({ jwt: jwt || '', page: 0 }));
    dispatch(fetchAllUser(jwt || ''));
    dispatch(getAllDeals());
    dispatch(fetchMonthlyOrderStats({ year: new Date().getFullYear(), jwt: jwt || '' }));
  }, [dispatch, jwt]);

  // Tổng doanh thu năm hiện tại
  const totalRevenue = (monthlyStats || []).reduce((sum, item) => sum + (item.totalRevenue || 0), 0);
  // Tổng đơn hàng năm hiện tại
  const totalOrders = (monthlyStats || []).reduce((sum, item) => sum + (item.totalOrders || 0), 0);

  const values: Record<'products' | 'orders' | 'users' | 'revenue', number> = {
    products: adminProduct.pageable?.totalElements ?? 0,
    orders: totalOrders,
    users: users?.length ?? 0,
    revenue: totalRevenue,
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cardData.map((card, idx) => (
          <Grid item xs={12} sm={6} md={4} key={card.key}>
            <Card
              elevation={4}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2.5,
                borderRadius: 4,
                boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)',
                minHeight: 120,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: card.bg,
                  color: card.color,
                  width: 56,
                  height: 56,
                  mr: 2.5,
                  fontSize: 32,
                  boxShadow: 2,
                }}
              >
                {card.icon}
              </Avatar>
              <CardContent sx={{ flex: 1, p: 0 }}>
                <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mb: 0.5 }}>
                  {card.label}
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{
                    color: card.color,
                    lineHeight: 1.1,
                    mb: 0.5,
                    fontSize: { xs: 28, sm: 32, md: 36 },
                  }}
                >
                  {card.key === 'revenue'
                    ? values[card.key].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                    : values[card.key].toLocaleString('vi-VN')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeDashboard; 