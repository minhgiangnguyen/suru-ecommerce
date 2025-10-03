@echo off
echo Setting up Suzu E-commerce Project...

REM Create environment files
echo Creating environment files...

REM Backend .env
(
echo DATABASE_URL="postgresql://postgres:123456@localhost:5432/suzu?schema=public"
echo JWT_SECRET="supersecretjwt"
echo PORT=4000
) > backend\.env

REM Customer app .env.local
echo NEXT_PUBLIC_API_URL=http://localhost:4000 > customer-app\.env.local

REM Admin app .env.local
echo NEXT_PUBLIC_API_URL=http://localhost:4000 > admin-app\.env.local

echo Environment files created!

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install

REM Generate Prisma client
echo Generating Prisma client...
call npx prisma generate

REM Run migrations
echo Running database migrations...
call npx prisma migrate dev --name init

REM Seed database
echo Seeding database...
call npm run prisma:seed

cd ..

REM Install customer app dependencies
echo Installing customer app dependencies...
cd customer-app
call npm install
cd ..

REM Install admin app dependencies
echo Installing admin app dependencies...
cd admin-app
call npm install
cd ..

echo Setup complete!
echo.
echo To start the applications:
echo 1. Backend: cd backend ^&^& npm run start:dev
echo 2. Customer app: cd customer-app ^&^& npm run dev
echo 3. Admin app: cd admin-app ^&^& npm run dev
echo.
echo Make sure PostgreSQL is running with database 'suzu' and user 'postgres' with password '123456'

























