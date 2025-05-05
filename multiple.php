<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hostel Registration</title>
    <link rel="stylesheet" href="../css/multiple.css">
    <link rel="stylesheet" type="text/css" href="../css/headerstyleo.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <div class="outerheader">
        <div class="header">
            <div class="left">
                <img class="icon" src="../images/ownerbackground.jpg" alt="Logo">
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

    <div class="form-wrapper">
        <div class="container">
            <div class="section active" id="owner-info">
                <h2>Owner Information</h2>
                <form id="registration-form" method="post" action="../php/owner_register.php" enctype="multipart/form-data">
                    <div class="inputbox">
                        <label for="full-name">Full Name:</label>
                        <span class="icon"><i class='bx bxs-user'></i></span>
                        <input type="text" id="full-name" name="full_name" required>
                    </div>
                    <div class="inputbox">
                        <label for="email">Email Address:</label>
                        <span class="icon"><i class='bx bxs-envelope'></i></span>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="inputbox">
                        <label for="password">Password:</label>
                        <span class="icon"><i class='bx bxs-lock-alt'></i></span>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <div class="inputbox">
                        <label for="phone">Phone Number:</label>
                        <span class="icon"><i class='bx bxs-phone'></i></span>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <div class="inputbox">
                        <label for="alt-phone">Alternate Phone (Optional):</label>
                        <span class="icon"><i class='bx bxs-phone'></i></span>
                        <input type="tel" id="alt-phone" name="alt_phone">
                    </div>
                    <div class="inputbox">
                        <label for="gov-id">Government ID:</label>
                        <span class="icon"><i class='bx bxs-id-card'></i></span>
                        <input type="file" id="gov-id" name="gov_id" accept=".jpg,.jpeg,.png,.pdf" required>
                    </div>
                    <button type="button" class="btn" onclick="nextSection('hostel-details')">Next</button>
                </form>
            </div>

            <div class="section" id="hostel-details">
                <h2>Hostel Details</h2>
                <form>
                    <div class="inputbox">
                        <label for="hostel-name">Hostel Name:</label>
                        <input type="text" id="hostel-name" name="hostel_name" required>
                    </div>
                    <div class="inputbox">
                        <label for="hostel-type">Type of Hostel:</label>
                        <select id="hostel-type" name="hostel_type" required>
                            <option value="">Select</option>
                            <option value="male">Boys Hostel</option>
                            <option value="female">Girls Hostel</option>
                            <option value="co-ed">Co-ed</option>
                        </select>
                    </div>
                    <div class="inputbox">
                        <label for="hostel-description">Hostel Description:</label>
                        <textarea id="hostel-description" name="hostel_description" rows="4" required></textarea>
                    </div>
                    <div class="inputbox">
                        <label for="landmarks">Nearby Landmarks:</label>
                        <input type="text" id="landmarks" name="landmarks">
                    </div>
                    <button type="button" class="btn prev-btn" onclick="prevSection('owner-info')">Previous</button>
                    <button type="button" class="btn" onclick="nextSection('room-details')">Next</button>
                </form>
            </div>

            <div class="section" id="room-details">
                <h2>Room Details</h2>
                <form>
                    <div class="inputbox">
                        <label for="number-of-rooms">Number of Rooms:</label>
                        <input type="number" id="number-of-rooms" name="number_of_rooms" required>
                    </div>
                    <div class="inputbox">
                        <label for="room-types">Types of Rooms:</label>
                        <select id="room-types" name="room_types" required>
                            <option value="">Select</option>
                            <option value="single">Single</option>
                            <option value="double">Double</option>
                            <option value="triple">Triple</option>
                            <option value="dormitory">Dormitory</option>
                        </select>
                    </div>
                    <div class="inputbox">
                        <label for="room-pricing">Room Pricing:</label>
                        <input type="text" id="room-pricing" name="room_pricing" required>
                    </div>
                    <div class="inputbox">
                        <label for="availability-status">Availability Status:</label>
                        <select id="availability-status" name="availability_status" required>
                            <option value="">Select</option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </div>
                    <button type="button" class="btn prev-btn" onclick="prevSection('hostel-details')">Previous</button>
                    <button type="button" class="btn" onclick="nextSection('amenities')">Next</button>
                </form>
            </div>

            <div class="section" id="amenities">
                <h2>Amenities & Facilities</h2>
                <form>
                    <div class="inputbox">
                        <label for="wifi">Wi-Fi:</label>
                        <select id="wifi" name="wifi" required>
                            <option value="">Select</option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </div>
                    <div class="inputbox">
                        <label for="parking">Parking:</label>
                        <select id="parking" name="parking" required>
                            <option value="">Select</option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </div>
                    <div class="inputbox">
                        <label for="laundry">Laundry:</label>
                        <select id="laundry" name="laundry" required>
                            <option value="">Select</option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </div>
                    <div class="inputbox">
                        <label for="security-features">Security Features:</label>
                        <select id="security-features" name="security_features" required>
                            <option value="">Select</option>
                            <option value="cctv">CCTV</option>
                            <option value="guards">Security Guards</option>
                            <option value="both">Both</option>
                        </select>
                    </div>
                    <div class="inputbox">
                        <label for="common-areas-select">Common Areas:</label>
                        <select id="common-areas-select" name="common_areas" required>
                            <option value="">Select</option>
                            <option value="lounge">Lounge</option>
                            <option value="study-room">Study Room</option>
                            <option value="both">Both</option>
                        </select>
                    </div>
                    <div class="inputbox">
                        <label for="bathroom-type">Bathroom Type:</label>
                        <select id="bathroom-type" name="bathroom_type" required>
                            <option value="">Select</option>
                            <option value="attached">Attached</option>
                            <option value="shared">Shared</option>
                        </select>
                    </div>
                    <button type="button" class="btn prev-btn" onclick="prevSection('room-details')">Previous</button>
                    <button type="button" class="btn" onclick="nextSection('payment')">Next</button>
                </form>
            </div>

            <div class="section" id="payment">
                <h2>Payment & Policies</h2>
                <form>
                    <div class="inputbox">
                        <label for="payment-methods">Payment Methods:</label>
                        <select id="payment-methods" name="payment_methods" required>
                            <option value="">Select</option>
                            <option value="cash">Cash</option>
                            <option value="online">Online</option>
                            <option value="both">Both</option>
                        </select>
                    </div>
                    <div class="inputbox">
                        <label for="advance-payment">Advance Payment:</label>
                        <select id="advance-payment" name="advance_payment" required>
                            <option value="">Select</option>
                            <option value="1">1 Month</option>
                            <option value="2">2 Months</option>
                            <option value="3">3 Months</option>
                        </select>
                    </div>
                    <div class="inputbox">
                        <label for="refund-policy">Refund Policy:</label>
                        <textarea id="refund-policy" name="refund_policy" rows="4" required></textarea>
                    </div>
                    <div class="inputbox">
                        <label for="security-deposit">Security Deposit:</label>
                        <input type="number" id="security-deposit" name="security_deposit" required>
                    </div>
                    <button type="button" class="btn prev-btn" onclick="prevSection('amenities')">Previous</button>
                    <button type="button" class="btn" onclick="nextSection('images')">Next</button>
                </form>
            </div>

            <div class="section" id="images">
                <h2>Hostel Images</h2>
                <form>
                    <div class="inputbox">
                        <label for="front-view">Front View:</label>
                        <input type="file" id="front-view" name="front_view" accept="image/*" required>
                    </div>
                    <div class="inputbox">
                        <label for="room-images">Room Images:</label>
                        <input type="file" id="room-images" name="room_images" accept="image/*" multiple required>
                    </div>
                    <div class="inputbox">
                        <label for="bathroom-images">Bathroom Images:</label>
                        <input type="file" id="bathroom-images" name="bathroom_images" accept="image/*" multiple required>
                    </div>
                    <div class="inputbox">
                        <label for="common-areas-images">Common Areas Images:</label>
                        <input type="file" id="common-areas-images" name="common_areas_images" accept="image/*" multiple required>
                    </div>
                    <div class="inputbox">
                        <label for="dining-area">Dining Area:</label>
                        <input type="file" id="dining-area" name="dining_area" accept="image/*" required>
                    </div>
                    <button type="button" class="btn prev-btn" onclick="prevSection('payment')">Previous</button>
                    <button type="button" class="btn" onclick="nextSection('terms')">Next</button>
                </form>
            </div>

            <div class="section" id="terms">
                <h2>Terms & Conditions</h2>
                <div class="terms-content">
                    <p>By creating an account, you agree to our terms and conditions...</p>
                    <div class="inputbox">
                        <input type="checkbox" id="agree" name="agree" required>
                        <label for="agree">I agree to the terms and conditions</label>
                    </div>
                </div>
                <button type="button" class="btn prev-btn" onclick="prevSection('images')">Previous</button>
                <button type="button" class="btn btn-primary" onclick="_createAccount()">Create Account</button>
            </div>
        </div>
    </div>
    <script src="../scripts/multipleowner.js"></script>
    <script>
        // Ensure the function is available
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof _createAccount !== 'function') {
                console.error('_createAccount function not found');
            }
        });
    </script>
</body>
</html>
