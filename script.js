document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Navigation
    const navItems = document.querySelectorAll('.sidebar-nav li');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the page name from data attribute
            const page = this.getAttribute('data-page');
            
            // Update the main content based on the selected page
            updateMainContent(page);
        });
    });

    // Function to update main content
    function updateMainContent(page) {
        const mainContent = document.querySelector('.main-content');
        const headerTitle = document.querySelector('.header-left h1');
        
        // Update header title
        headerTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);
        
        // Update content based on page
        const dashboardContent = document.querySelector('.dashboard-content');
        
        switch(page) {
            case 'dashboard':
                dashboardContent.innerHTML = `
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon users">
                                <i class="ri-user-line"></i>
                            </div>
                            <div class="stat-info">
                                <h3>Total Users</h3>
                                <p class="stat-value">2,543</p>
                                <p class="stat-change positive">+12%</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon revenue">
                                <i class="ri-money-dollar-circle-line"></i>
                            </div>
                            <div class="stat-info">
                                <h3>Revenue</h3>
                                <p class="stat-value">$45,231</p>
                                <p class="stat-change positive">+8%</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon active">
                                <i class="ri-user-heart-line"></i>
                            </div>
                            <div class="stat-info">
                                <h3>Active Users</h3>
                                <p class="stat-value">1,234</p>
                                <p class="stat-change positive">+5%</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon growth">
                                <i class="ri-line-chart-line"></i>
                            </div>
                            <div class="stat-info">
                                <h3>Growth</h3>
                                <p class="stat-value">32%</p>
                                <p class="stat-change positive">+2%</p>
                            </div>
                        </div>
                    </div>
                    <div class="charts-grid">
                        <div class="chart-card">
                            <h3>User Growth</h3>
                            <div class="chart-placeholder">
                                Chart will be displayed here
                            </div>
                        </div>
                        <div class="chart-card">
                            <h3>Revenue</h3>
                            <div class="chart-placeholder">
                                Chart will be displayed here
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'users':
                dashboardContent.innerHTML = `
                    <div class="users-content">
                        <h2>Users Management</h2>
                        <p>User management content will be displayed here</p>
                    </div>
                `;
                break;
                
            case 'profile':
                dashboardContent.innerHTML = `
                    <div class="profile-content">
                        <h2>Profile Settings</h2>
                        <p>Profile settings content will be displayed here</p>
                    </div>
                `;
                break;
                
            case 'settings':
                dashboardContent.innerHTML = `
                    <div class="settings-content">
                        <h2>System Settings</h2>
                        <p>System settings content will be displayed here</p>
                    </div>
                `;
                break;
                
            case 'analytics':
                dashboardContent.innerHTML = `
                    <div class="analytics-content">
                        <h2>Analytics Dashboard</h2>
                        <p>Analytics content will be displayed here</p>
                    </div>
                `;
                break;
                
            case 'messages':
                dashboardContent.innerHTML = `
                    <div class="messages-content">
                        <h2>Messages</h2>
                        <p>Messages content will be displayed here</p>
                    </div>
                `;
                break;
                
            case 'notifications':
                dashboardContent.innerHTML = `
                    <div class="notifications-content">
                        <h2>Notifications</h2>
                        <p>Notifications content will be displayed here</p>
                    </div>
                `;
                break;
                
            case 'tasks':
                dashboardContent.innerHTML = `
                    <div class="tasks-content">
                        <h2>Tasks</h2>
                        <p>Tasks content will be displayed here</p>
                    </div>
                `;
                break;
        }
    }

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        // Add search functionality here
        console.log('Searching for:', searchTerm);
    });

    // Responsive sidebar
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    });
}); 