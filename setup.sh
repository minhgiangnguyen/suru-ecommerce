#!/bin/bash

echo "Setting up Suzu E-commerce Project..."

# Create environment files
echo "Creating environment files..."

# Backend .env
cat > backend/.env << EOF
DATABASE_URL="postgresql://postgres:123456@localhost:5432/suzu?schema=public"
JWT_SECRET="supersecretjwt"
PORT=4000
EOF

# Customer app .env.local
cat > customer-app/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:4000
EOF

# Admin app .env.local
cat > admin-app/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:4000
EOF

echo "Environment files created!"

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Run migrations
echo "Running database migrations..."
npx prisma migrate dev --name init

# Seed database
echo "Seeding database..."
npm run prisma:seed

cd ..

# Install customer app dependencies
echo "Installing customer app dependencies..."
cd customer-app
npm install
cd ..

# Install admin app dependencies
echo "Installing admin app dependencies..."
cd admin-app
npm install
cd ..

echo "Setup complete!"
echo ""
echo "To start the applications:"
echo "1. Backend: cd backend && npm run start:dev"
echo "2. Customer app: cd customer-app && npm run dev"
echo "3. Admin app: cd admin-app && npm run dev"
echo ""
echo "Make sure PostgreSQL is running with database 'suzu' and user 'postgres' with password '123456'"
























