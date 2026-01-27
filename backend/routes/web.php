<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/health', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'Drinks API is running',
        'timestamp' => now()->toDateTimeString()
    ]);
});

Route::get('/debug-config', function () {
    // Check what environment variables are actually loaded
    $env = [
        'DB_HOST' => env('DB_HOST'),
        'DB_PORT' => env('DB_PORT'),
        'DB_DATABASE' => env('DB_DATABASE'),
        'DB_USERNAME' => env('DB_USERNAME'),
        'DB_PASSWORD' => env('DB_PASSWORD'), // Will show as (set) or (not set)
        'DB_CONNECTION' => env('DB_CONNECTION'),
        'APP_ENV' => env('APP_ENV'),
        'APP_DEBUG' => env('APP_DEBUG'),
    ];
    
    // Check the actual database config from config file
    $config = config('database.connections.mysql');
    
    // Hide password in output for security
    if (isset($config['password'])) $config['password'] = '(hidden)';
    
    return response()->json([
        'environment_variables' => $env,
        'database_config' => $config,
        'php_version' => phpversion(),
        'pdo_mysql_loaded' => extension_loaded('pdo_mysql'),
    ]);
});

Route::get('/test-pdo', function () {
    $host = env('DB_HOST');
    $port = env('DB_PORT');
    $dbname = env('DB_DATABASE');
    $username = env('DB_USERNAME');
    $password = env('DB_PASSWORD');
    
    $results = [
        'connection_string' => "mysql:host=$host;port=$port;dbname=$dbname",
        'username' => $username,
        'password_set' => !empty($password),
    ];
    
    try {
        // Test WITHOUT SSL options first
        $pdo = new PDO(
            "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4",
            $username,
            $password,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        
        $results['connection_test'] = 'SUCCESS - No SSL';
        $results['pdo_version'] = $pdo->getAttribute(PDO::ATTR_CLIENT_VERSION);
        
    } catch (PDOException $e) {
        $results['connection_test'] = 'FAILED - No SSL';
        $results['error_no_ssl'] = $e->getMessage();
        
        // Now test WITH SSL options
        try {
            $pdo = new PDO(
                "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4",
                $username,
                $password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::MYSQL_ATTR_SSL_CA => '/etc/ssl/certs/ca-certificates.crt',
                    PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
                ]
            );
            
            $results['connection_test'] = 'SUCCESS - With SSL';
            $results['pdo_version'] = $pdo->getAttribute(PDO::ATTR_CLIENT_VERSION);
            
        } catch (PDOException $e2) {
            $results['connection_test'] = 'FAILED - With SSL';
            $results['error_with_ssl'] = $e2->getMessage();
        }
    }
    
    return response()->json($results);
});

Route::get('/test-network', function () {
    $host = env('DB_HOST');
    $port = env('DB_PORT');
    
    $results = [];
    
    // Test 1: Basic socket connection
    $socket = @fsockopen($host, $port, $errno, $errstr, 10);
    
    if ($socket) {
        $results['socket_test'] = 'SUCCESS';
        fclose($socket);
    } else {
        $results['socket_test'] = 'FAILED';
        $results['socket_error'] = "$errno: $errstr";
    }
    
    // Test 2: DNS resolution
    $ip = gethostbyname($host);
    $results['dns_resolution'] = $ip;
    $results['is_hostname'] = ($ip !== $host);
    
    return response()->json($results);
});

Route::get('/check-ssl-certs', function () {
    $certPath = '/etc/ssl/certs/ca-certificates.crt';
    
    $results = [
        'certificate_file_exists' => file_exists($certPath),
        'certificate_readable' => is_readable($certPath),
    ];
    
    if (file_exists($certPath)) {
        $results['file_size'] = filesize($certPath);
        $results['file_mtime'] = date('Y-m-d H:i:s', filemtime($certPath));
        
        // Check if it contains FreeDB/MySQL related certs
        $content = file_get_contents($certPath);
        $results['contains_mysql_terms'] = (
            strpos($content, 'MySQL') !== false || 
            strpos($content, 'RDS') !== false ||
            strpos($content, 'Amazon') !== false
        ) ? 'Yes' : 'No (may still work)';
    }
    
    // Check other possible cert locations
    $otherCerts = [
        '/etc/ssl/certs/ca-bundle.crt',
        '/etc/pki/tls/certs/ca-bundle.crt',
        '/usr/local/etc/openssl/cert.pem',
    ];
    
    foreach ($otherCerts as $cert) {
        $results[$cert] = file_exists($cert) ? 'Exists' : 'Not found';
    }
    
    return response()->json($results);
});

