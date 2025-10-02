# Suzu Admin App - Material UI Dashboard

A complete admin dashboard built with Next.js, TypeScript, and Material UI for managing the Suzu e-commerce platform.

## Features

- **Modern Material UI Design** - Professional admin interface with responsive layout
- **JWT Authentication** - Secure login with automatic token management
- **Dashboard Overview** - Statistics cards and recent activity
- **Product Management** - Full CRUD operations with DataGrid
- **Order Management** - Track and update order statuses
- **Review Management** - Write reviews and manage replies
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Next.js 14** - React framework with TypeScript
- **Material UI 5** - Component library and design system
- **MUI X DataGrid** - Advanced data tables
- **Axios** - HTTP client with JWT interceptors
- **TypeScript** - Type-safe development

## Project Structure

```
admin-app/
├── pages/
│   ├── _app.tsx              # App wrapper with MUI theme
│   ├── _document.tsx         # HTML document setup
│   ├── login.tsx             # Login page
│   ├── dashboard.tsx         # Dashboard overview
│   ├── products/
│   │   └── index.tsx         # Products management
│   ├── orders.tsx            # Orders management
│   └── reviews/
│       └── write.tsx         # Reviews management
├── components/
│   ├── AdminLayout.tsx       # Main layout with sidebar
│   └── ProductForm.tsx       # Product form dialog
├── services/
│   └── api.ts               # API client with JWT
├── src/
│   └── theme/
│       └── theme.ts         # Material UI theme
└── .env.local              # Environment variables
```

## Installation & Setup

### 1. Install Dependencies

```bash
cd admin-app
npm install
```

### 2. Environment Configuration

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Start Development Server

```bash
npm run dev
```

The admin app will be available at `http://localhost:3001`

## Usage

### Login
- Visit `http://localhost:3001/login`
- Use default credentials: `admin` / `admin123`
- JWT token is automatically stored and managed

### Dashboard
- Overview of products, orders, and reviews
- Recent activity cards
- Revenue statistics

### Products Management
- View all products in a sortable, filterable table
- Add new products with the "Add Product" button
- Edit products by clicking the edit icon
- Delete products with confirmation dialog
- Color-coded sale percentages and topbar colors

### Orders Management
- View all customer orders
- Update receive and transfer status
- Customer information and product details
- Status indicators with color coding

### Reviews Management
- Select product to view reviews
- Write new reviews with ratings
- Reply to existing reviews
- Star ratings and timestamps

## API Integration

The app automatically connects to the backend API with:

- **JWT Authentication** - Tokens are automatically attached to requests
- **Error Handling** - 401 errors redirect to login
- **Loading States** - Spinners and disabled states during API calls
- **Success/Error Alerts** - User feedback for all operations

## Material UI Components Used

- **Layout**: AppBar, Drawer, Toolbar, Box, Grid
- **Data Display**: DataGrid, Card, List, Chip, Avatar
- **Input**: TextField, Select, Rating, Color Picker
- **Feedback**: Alert, CircularProgress, Dialog, Snackbar
- **Navigation**: Button, IconButton, Menu, ListItem
- **Typography**: Typography with various variants

## Customization

### Theme
Edit `src/theme/theme.ts` to customize:
- Color palette
- Typography
- Component styles
- Spacing and breakpoints

### Layout
Modify `components/AdminLayout.tsx` to:
- Change sidebar items
- Update navigation structure
- Customize header and footer

### Forms
Update `components/ProductForm.tsx` to:
- Add new form fields
- Change validation rules
- Modify form layout

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

### Code Structure

- **Pages** - Next.js pages with routing
- **Components** - Reusable UI components
- **Services** - API integration and utilities
- **Theme** - Material UI customization

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start production server:
   ```bash
   npm run start
   ```

3. Configure environment variables for production
4. Set up reverse proxy if needed
5. Configure SSL certificates

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check `NEXT_PUBLIC_API_URL` in `.env.local`
   - Ensure backend is running on correct port

2. **Login Issues**
   - Verify backend authentication endpoint
   - Check JWT secret configuration

3. **Data Not Loading**
   - Check browser console for errors
   - Verify API endpoints are working
   - Check network tab for failed requests

### Debug Mode

Enable debug logging by adding to `.env.local`:
```env
NEXT_PUBLIC_DEBUG=true
```

## License

MIT License - see LICENSE file for details
























