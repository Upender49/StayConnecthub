<?php
session_start();

// Check if owner is logged in
if (!isset($_SESSION['owner_id'])) {
    header("Location: owner-login.php");
    exit();
}

// Include database configuration
require_once '../php/config.php';

// Get owner ID from session
$owner_id = $_SESSION['owner_id'];

// Get total hostels
$hostels_sql = "SELECT COUNT(*) as total_hostels FROM hostels WHERE owner_id = ?";
$hostels_stmt = $conn->prepare($hostels_sql);
$hostels_stmt->bind_param("i", $owner_id);
$hostels_stmt->execute();
$hostels_result = $hostels_stmt->get_result();
$hostels_row = $hostels_result->fetch_assoc();
$total_hostels = $hostels_row['total_hostels'];

// Get total rooms
$rooms_sql = "SELECT COUNT(*) as total_rooms FROM rooms r 
               JOIN hostels h ON r.hostel_id = h.id 
               WHERE h.owner_id = ?";
$rooms_stmt = $conn->prepare($rooms_sql);
$rooms_stmt->bind_param("i", $owner_id);
$rooms_stmt->execute();
$rooms_result = $rooms_stmt->get_result();
$rooms_row = $rooms_result->fetch_assoc();
$total_rooms = $rooms_row['total_rooms'];

// Get total tenants
$tenants_sql = "SELECT COUNT(*) as total_tenants FROM tenants t 
                JOIN rooms r ON t.room_id = r.id 
                JOIN hostels h ON r.hostel_id = h.id 
                WHERE h.owner_id = ? AND t.status = 'active'";
$tenants_stmt = $conn->prepare($tenants_sql);
$tenants_stmt->bind_param("i", $owner_id);
$tenants_stmt->execute();
$tenants_result = $tenants_stmt->get_result();
$tenants_row = $tenants_result->fetch_assoc();
$total_tenants = $tenants_row['total_tenants'];

// Get total revenue
$revenue_sql = "SELECT SUM(p.amount) as total_revenue FROM payments p 
                JOIN tenants t ON p.tenant_id = t.id 
                JOIN rooms r ON t.room_id = r.id 
                JOIN hostels h ON r.hostel_id = h.id 
                WHERE h.owner_id = ? AND p.status = 'completed'";
$revenue_stmt = $conn->prepare($revenue_sql);
$revenue_stmt->bind_param("i", $owner_id);
$revenue_stmt->execute();
$revenue_result = $revenue_stmt->get_result();
$revenue_row = $revenue_result->fetch_assoc();
$total_revenue = $revenue_row['total_revenue'] ?? 0;

// Get recent payments
$recent_payments_sql = "SELECT p.*, t.name as tenant_name, r.room_name, h.name as hostel_name 
                       FROM payments p 
                       JOIN tenants t ON p.tenant_id = t.id 
                       JOIN rooms r ON t.room_id = r.id 
                       JOIN hostels h ON r.hostel_id = h.id 
                       WHERE h.owner_id = ? 
                       ORDER BY p.payment_date DESC 
                       LIMIT 5";
$recent_payments_stmt = $conn->prepare($recent_payments_sql);
$recent_payments_stmt->bind_param("i", $owner_id);
$recent_payments_stmt->execute();
$recent_payments_result = $recent_payments_stmt->get_result();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Owner Dashboard</title>
    <link rel="stylesheet" href="../css/dashboard.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="dashboard-container">
        <nav class="sidebar">
            <div class="logo">
                <i class='bx bxs-building-house'></i>
                <span>Stay Connect</span>
            </div>
            <ul class="nav-links">
                <li class="active">
                    <a href="#"><i class='bx bxs-dashboard'></i>Dashboard</a>
                </li>
                <li>
                    <a href="#"><i class='bx bxs-building'></i>My Hostels</a>
                </li>
                <li>
                    <a href="#"><i class='bx bxs-user'></i>Profile</a>
                </li>
                <li>
                    <a href="#"><i class='bx bxs-bell'></i>Notifications</a>
                </li>
                <li>
                    <a href="#"><i class='bx bxs-cog'></i>Settings</a>
                </li>
                <li>
                    <a href="../php/logout.php"><i class='bx bxs-log-out'></i>Logout</a>
                </li>
            </ul>
        </nav>
        
        <main class="main-content">
            <header class="top-bar">
                <div class="welcome">
                    <h2>Welcome, <?php echo htmlspecialchars($_SESSION['owner_name']); ?></h2>
                </div>
                <div class="user-info">
                    <span class="email"><?php echo htmlspecialchars($_SESSION['owner_email']); ?></span>
                    <div class="logo-container">
                        <img src="../images/logo.png" alt="Stay Connect Logo" class="top-logo">
                    </div>
                </div>
            </header>
            
            <div class="dashboard-content">
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class='bx bxs-building'></i>
                        <div class="stat-info">
                            <h3>Total Hostels</h3>
                            <p><?php echo $total_hostels; ?></p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class='bx bxs-bed'></i>
                        <div class="stat-info">
                            <h3>Total Rooms</h3>
                            <p><?php echo $total_rooms; ?></p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class='bx bxs-user'></i>
                        <div class="stat-info">
                            <h3>Total Tenants</h3>
                            <p><?php echo $total_tenants; ?></p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class='bx bxs-wallet'></i>
                        <div class="stat-info">
                            <h3>Total Revenue</h3>
                            <p>₹<?php echo number_format($total_revenue, 2); ?></p>
                        </div>
                    </div>
                </div>
                
                <div class="charts-section">
                    <div class="chart-container">
                        <h3>Revenue Analytics</h3>
                        <div class="chart-controls">
                            <button class="active" data-period="monthly">Monthly</button>
                            <button data-period="weekly">Weekly</button>
                            <button data-period="daily">Daily</button>
                        </div>
                        <div class="date-range">
                            <button class="active">3 Months</button>
                            <button>6 Months</button>
                            <button>1 Year</button>
                        </div>
                        <canvas id="revenueChart"></canvas>
                    </div>
                </div>
                
                <div class="recent-activity">
                    <h3>Recent Payments</h3>
                    <div class="activity-list">
                        <?php if ($recent_payments_result->num_rows > 0): ?>
                            <?php while ($payment = $recent_payments_result->fetch_assoc()): ?>
                                <div class="activity-item">
                                    <div class="activity-icon">
                                        <i class='bx bxs-wallet'></i>
                                    </div>
                                    <div class="activity-details">
                                        <h4><?php echo htmlspecialchars($payment['tenant_name']); ?></h4>
                                        <p><?php echo htmlspecialchars($payment['hostel_name']); ?> - <?php echo htmlspecialchars($payment['room_name']); ?></p>
                                        <span class="activity-time"><?php echo date('d M Y', strtotime($payment['payment_date'])); ?></span>
                                    </div>
                                    <div class="activity-amount">
                                        <span>₹<?php echo number_format($payment['amount'], 2); ?></span>
                                    </div>
                                </div>
                            <?php endwhile; ?>
                        <?php else: ?>
                            <div class="no-activity">
                                <p>No recent payments found.</p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </main>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="../scripts/dashboard.js"></script>
</body>
</html> 