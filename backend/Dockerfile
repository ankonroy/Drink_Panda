FROM php:8.4-cli

# Install system packages and PHP extensions
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files first
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-dev --no-scripts --no-autoloader

# Copy the rest of the application
COPY . .

# Make artisan executable and set proper permissions
RUN chmod +x artisan && \
    chmod -R 775 storage bootstrap/cache

# Generate optimized autoloader
RUN composer dump-autoload --optimize

# Verify artisan exists and is executable
RUN ls -la artisan && file artisan

# Expose port
EXPOSE 8000

# Start Laravel server
CMD ["sh", "-c", "echo 'Starting Laravel server...' && php artisan serve --host=0.0.0.0 --port=${PORT:-8000}"]