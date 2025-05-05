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

    <div class="form-wrapper">
        <div class="container">
            <div class="section active" id="login">
                <h2>Login</h2>
                <?php
                session_start();
                if(isset($_SESSION['error_message'])) {
                    echo '<div class="error-message">' . $_SESSION['error_message'] . '</div>';
                    unset($_SESSION['error_message']);
                }
                if(isset($_SESSION['success_message'])) {
                    echo '<div class="success-message">' . $_SESSION['success_message'] . '</div>';
                    unset($_SESSION['success_message']);
                }
                ?>
                <form action="../php/login_register.php" method="post" onsubmit="return validateForm()">
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
                        <p>Don't have an account? <a href="multiple.php" 
                            class="register-link" id="signUpBtn">Sign Up</a></p>
                            <button type="submit" name="login" class="btn">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
    function validateForm() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        console.log('Login attempt with email:', email);
        
        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return false;
        }
        
        console.log('Form validation passed, submitting...');
        return true;
    }
    </script>
    <script src="../scripts/multipleowner.js"></script>
</body>
</html>
