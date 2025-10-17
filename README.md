# Drink Panda - Juice E-commerce Platform

A full-stack e-commerce application for ordering fresh juices, built with Laravel (backend) and Next.js (frontend).

## Project Overview

Drink Panda is a modern juice ordering platform featuring:
- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS
- **Backend**: Laravel 12 with Sanctum authentication
- **Features**: Product catalog, user authentication, shopping cart, admin panel, payment integration (bKash, Nagad)
- **Database**: MySQL/SQLite with Eloquent ORM

## Architecture

### Backend (Laravel)
- **Framework**: Laravel 12
- **Authentication**: Laravel Sanctum (token-based)
- **Payments**: bKash Tokenize, Nagad integration
- **Database**: Eloquent ORM with migrations
- **API**: RESTful endpoints for products, orders, users

### Frontend (Next.js)
- **Framework**: Next.js 15 App Router
- **Styling**: Tailwind CSS
- **State Management**: React hooks + localStorage
- **Authentication**: Client-side auth with API integration

## Features

### User Features
- Browse juice products
- User registration and login
- Shopping cart with user-specific storage
- Secure checkout with multiple payment options
- Order history and tracking
- Profile management

### Admin Features
- Product management (CRUD)
- Order management
- User management
- Dashboard analytics

### Technical Features
- Responsive design
- Role-based access control
- Cart persistence across sessions
- API integration with error handling
- Modern UI with dark/light theme support

## Tech Stack

### Backend
- PHP 8.2+
- Laravel 12
- MySQL/SQLite
- Laravel Sanctum
- bKash Tokenize Payment
- Nagad Payment

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- ESLint

## Getting Started

### Prerequisites
- PHP 8.2 or higher
- Node.js 18 or higher
- Composer
- npm or yarn
- MySQL or SQLite

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd drink-panda
   ```

2. **Backend Setup**
   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   php artisan db:seed
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**

   **Backend (.env)**
   ```env
   APP_NAME="Drink Panda"
   APP_ENV=local
   APP_KEY=base64:your-key-here
   APP_DEBUG=true
   APP_URL=http://localhost:8000

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=drink_panda
   DB_USERNAME=your_username
   DB_PASSWORD=your_password

   # Payment configurations
   BKASH_APP_KEY=your-bkash-key
   BKASH_APP_SECRET=your-bkash-secret
   BKASH_USERNAME=your-bkash-username
   BKASH_PASSWORD=your-bkash-password

   NAGAD_MERCHANT_ID=your-nagad-merchant-id
   NAGAD_MERCHANT_PRIVATE_KEY=your-nagad-private-key
   ```

   **Frontend (.env.local)**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

### Running the Application

1. **Start Backend**
   ```bash
   cd backend
   php artisan serve --port=8000
   ```

2. **Start Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api

### Default Credentials

**Admin User:**
- Email: admin@example.com
- Password: admin

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get authenticated user

### Products
- `GET /api/products` - List products
- `GET /api/products/{id}` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/{id}` - Update product (admin)
- `DELETE /api/products/{id}` - Delete product (admin)

### Orders
- `GET /api/orders` - List user orders
- `POST /api/orders` - Create order
- `GET /api/orders/{id}` - Get order details

## Project Structure

```
drink-panda/
├── backend/                 # Laravel backend
│   ├── app/                # Application code
│   ├── database/           # Migrations, seeders
│   ├── routes/             # API routes
│   ├── config/             # Configuration files
│   └── public/             # Public assets
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # React components
│   │   └── lib/           # Utilities and API functions
│   └── public/            # Static assets
└── README.md              # This file
```

## Development

### Backend Development
```bash
cd backend
composer install
php artisan migrate:fresh --seed
php artisan test
```

### Frontend Development
```bash
cd frontend
npm install
npm run lint
npm run build
```

## Deployment

### Backend Deployment
1. Configure production environment variables
2. Run migrations: `php artisan migrate`
3. Seed database: `php artisan db:seed`
4. Set up web server (Apache/Nginx) with PHP-FPM
5. Configure SSL certificates

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or any static hosting
3. Configure environment variables for production API URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact the development team or create an issue in the repository.
