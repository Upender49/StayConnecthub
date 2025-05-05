<!DOCTYPE html>
<html>
<head>
    <title>PHP Test</title>
</head>
<body>
    <h1>PHP Test</h1>
    <?php
    // Enable error reporting
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    
    // Display PHP information
    echo "<p>PHP is running correctly!</p>";
    echo "<p>PHP Version: " . phpversion() . "</p>";
    echo "<p>Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
    echo "<p>Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "</p>";
    
    // Test database connection
    require_once '../php/config.php';
    if ($conn) {
        echo "<p style='color:green'>Database connection successful!</p>";
    } else {
        echo "<p style='color:red'>Database connection failed!</p>";
    }
    
    // Test session
    session_start();
    $_SESSION['test'] = 'Session is working';
    echo "<p>Session test: " . (isset($_SESSION['test']) ? 'Working' : 'Not working') . "</p>";
    
    // Test file permissions
    $upload_dir = "../uploads/";
    if (file_exists($upload_dir)) {
        echo "<p>Upload directory exists</p>";
        if (is_writable($upload_dir)) {
            echo "<p style='color:green'>Upload directory is writable</p>";
        } else {
            echo "<p style='color:red'>Upload directory is not writable</p>";
        }
    } else {
        echo "<p>Upload directory does not exist</p>";
        if (mkdir($upload_dir, 0777, true)) {
            echo "<p style='color:green'>Created upload directory</p>";
        } else {
            echo "<p style='color:red'>Failed to create upload directory</p>";
        }
    }
    ?>
</body>
</html> 