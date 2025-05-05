<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../php/config.php';

// Initialize error/success messages
$error_message = $success_message = "";

// Check if there are any messages in the session
if (isset($_SESSION['error_message'])) {
    $error_message = $_SESSION['error_message'];
    unset($_SESSION['error_message']);
}
if (isset($_SESSION['success_message'])) {
    $success_message = $_SESSION['success_message'];
    unset($_SESSION['success_message']);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../css/multiple.css">
    <link rel="stylesheet" type="text/css" href="../css/headerstyleo.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <div class="outerheader">
        <div class="header">
            <div class="left">
                <img class="icon" src="../images/logo.webp" alt="Logo">
            </div>
            <div class="middle">
                <h1>STAY CONNECT<br>YOUR SMART ACCOMMODATION HUB</h1>
            </div>
            <div class="right">
                <button class="Aboutus-butt">About Us</button>
                <button class="Contact-butt">Contact Us</button>
            </div>
        </div>
    </div>

    <?php if (!empty($error_message)): ?>
    <div class="alert error"><?php echo $error_message; ?></div>
    <?php endif; ?>
    
    <?php if (!empty($success_message)): ?>
    <div class="alert success"><?php echo $success_message; ?></div>
    <?php endif; ?>

    <div class="form-wrapper">
        <div class="container">
            <div class="section active" id="login">
                <h2>Login</h2>
                <form action="../php/login_register.php" method="post">
                    <div class="inputbox">
                        <label for="login-email">Email Address:</label>
                        <span class="icon"><i class='bx bxs-envelope'></i></span>
                        <input type="email" id="login-email" name="login_email" required>
                    </div>
                    <div class="inputbox">
                        <label for="login-password">Password:</label>
                        <span class="icon"><i class='bx bxs-lock-alt'></i></span>
                        <input type="password" id="login-password" name="login_password" required>
                    </div>
                    <div class="remember-forgot">
                        <label><input type="checkbox">Remember me</label>
                        <a class="fpass" href="#">Forgot Password?</a>
                    </div>
                    <div class="login-register">
                        <p>Don't have an account? <a href="user-register.php" class="register-link">Sign Up</a></p>
                        <button type="submit" class="btn" name="login">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="../js/multiple.js"></script>
</body>
</html>