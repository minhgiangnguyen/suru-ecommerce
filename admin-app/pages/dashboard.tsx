import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Inventory,
  ShoppingCart,
  Reviews,
  TrendingUp,
  Person,
  AttachMoney,
} from '@mui/icons-material';
import { AdminLayout } from '../components/AdminLayout';
import api from '../services/api';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  // totalReviews: number;
  recentOrders: any[];
  // recentReviews: any[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [productsRes, ordersRes] = await Promise.all([
        api.get('/products'),
        api.get('/orders'),
        // api.get('/products/1/reviews'), // Get reviews from first product as example
      ]);

      setStats({
        totalProducts: productsRes.data.length,
        totalOrders: ordersRes.data.length,
        // totalReviews: reviewsRes.data.length,
        recentOrders: ordersRes.data.slice(0, 5),
        // recentReviews: reviewsRes.data.slice(0, 5),
      });
    } catch (err: any) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color = 'primary' }: any) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: `${color}.main`, mr: 2 }}>
            {icon}
          </Avatar>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <AdminLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Alert severity="error">{error}</Alert>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Chào mừng đến với trang quản trị Suzu
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Tổng số sản phẩm"
              value={stats?.totalProducts || 0}
              icon={<Inventory />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Tổng số đơn hàng"
              value={stats?.totalOrders || 0}
              icon={<ShoppingCart />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* <StatCard
              title="Tổng số đánh giá"
              value={stats?.totalReviews || 0}
              icon={<Reviews />}
              color="warning"
            /> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Doanh thu"
              value={`₫${stats?.recentOrders?.reduce((sum, order) => sum + order.totalPrice, 0) || 0}`}
              icon={<AttachMoney />}
              color="info"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Đơn hàng gần đây
                </Typography>
                <List>
                  {stats?.recentOrders?.map((order, index) => (
                    <React.Fragment key={order.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <Person />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Đơn hàng #${order.id} - ${order.customer?.name || 'Không rõ'}`}
                          secondary={`₫${order.totalPrice} - ${order.receiveStatus}`}
                        />
                        {/* <Chip
                          label={order.transferStatus === 'transferred' ? 'Đã chuyển khoản' : order.transferStatus}
                          color={order.transferStatus === 'transferred' ? 'success' : 'default'}
                          size="small"
                        /> */}
                      </ListItem>
                      {index < stats.recentOrders.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Đánh giá gần đây
                </Typography>
                 <List>
                  {stats?.recentReviews?.map((review, index) => (
                    <React.Fragment key={review.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <Reviews />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={review.authorName}
                          secondary={review.comment}
                        />
                        {review.rating && (
                          <Chip
                            label={`${review.rating}/5 sao`}
                            color="primary"
                            size="small"
                          />
                        )}
                      </ListItem>
                      {index < stats.recentReviews.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List> 
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>
      </Box>
    </AdminLayout>
  );
}


