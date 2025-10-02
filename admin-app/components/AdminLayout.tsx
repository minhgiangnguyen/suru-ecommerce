import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  Inventory,
  ShoppingCart,
  Reviews,
  Logout,
  AccountCircle,
  Person,
} from "@mui/icons-material";
import { AccountForm } from "./AccountForm";
import api from "../services/api";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { text: "Sản phẩm", icon: <Inventory />, path: "/san-pham" },
  { text: "Đơn hàng", icon: <ShoppingCart />, path: "/don-hang" },
  { text: "Đánh giá", icon: <Reviews />, path: "/danh-gia" },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface UserProfile {
  id: number;
  username: string;
  role: string;
  displayName?: string;
  avatar?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [accountFormOpen, setAccountFormOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDesktopToggle = () => {
    setDesktopOpen((prev) => !prev);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Load user profile
  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
    handleClose();
  };

  const handleAccountInfo = () => {
    setAccountFormOpen(true);
    handleClose();
  };

  const handleAccountSaved = () => {
    loadUserProfile(); // Reload profile after update
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          Suru
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={router.pathname === item.path}
              onClick={() => router.push(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: desktopOpen ? `calc(100% - ${drawerWidth}px)` : "100%" },
          ml: { sm: desktopOpen ? `${drawerWidth}px` : 0 },
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", mr: "auto" }}>
            {/* MenuIcon cho mobile */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            {/* MenuIcon cho desktop */}
            <IconButton
              color="inherit"
              onClick={handleDesktopToggle}
              sx={{ mr: 1, display: { xs: "none", sm: "inline-flex" } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Tiêu đề */}
            <Typography variant="h6" noWrap component="div">
              Bảng quản trị
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {userProfile?.avatar ? (
                <Avatar
                  src={userProfile.avatar}
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <AccountCircle sx={{ width: 32, height: 32 }} />
              )}
            </IconButton>
          </Box>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem >
              <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "text.primary",
                  }}
              >
                {userProfile?.displayName || userProfile?.username}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleAccountInfo}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>Thông tin tài khoản</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>Đăng xuất</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: desktopOpen ? drawerWidth : 0 },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: desktopOpen ? drawerWidth : 0,
              overflowX: "hidden",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: desktopOpen ? `calc(100% - ${drawerWidth}px)` : "100%" },
        }}
      >
        <Toolbar />
        {children}
      </Box>

      <AccountForm
        open={accountFormOpen}
        onClose={() => setAccountFormOpen(false)}
        initial={userProfile || undefined}
        onSaved={handleAccountSaved}
      />
    </Box>
  );
};
