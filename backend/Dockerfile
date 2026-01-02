FROM php:8.4-cli

# Install system packages and PHP extensions
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy all Laravel files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set proper permissions
RUN chmod -R 775 storage bootstrap/cache

# Expose port (Render will use $PORT environment variable)
EXPOSE 8000

# Start Laravel server
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-8000}