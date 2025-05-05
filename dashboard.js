// Revenue Analytics
document.addEventListener('DOMContentLoaded', function() {
    // Update stats with realistic data
    document.querySelector('.stat-card:nth-child(1) p').textContent = '3';
    document.querySelector('.stat-card:nth-child(2) p').textContent = '24';
    document.querySelector('.stat-card:nth-child(3) p').textContent = '18';
    document.querySelector('.stat-card:nth-child(4) p').textContent = '₹125,000';

    // Chart Controls
    const chartControls = document.querySelectorAll('.chart-controls button');
    chartControls.forEach(button => {
        button.addEventListener('click', function() {
            chartControls.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateChartData(this.dataset.period);
        });
    });

    // Date Range Controls
    const dateRangeButtons = document.querySelectorAll('.date-range button');
    dateRangeButtons.forEach(button => {
        button.addEventListener('click', function() {
            dateRangeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateForecastChart(this.textContent);
        });
    });

    // Initialize Revenue Chart
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Actual Revenue',
                data: [85000, 92000, 88000, 95000, 91000, 98000],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                fill: true,
                tension: 0.4
            }, {
                label: 'Forecasted Revenue',
                data: [null, null, null, 95000, 97000, 102000],
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                fill: true,
                tension: 0.4,
                borderDash: [5, 5]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });

    // Function to update chart data based on period
    function updateChartData(period) {
        // This would typically fetch new data from the server
        // For now, we'll just update the chart with dummy data
        const data = {
            monthly: {
                actual: [85000, 92000, 88000, 95000, 91000, 98000],
                forecast: [null, null, null, 95000, 97000, 102000]
            },
            weekly: {
                actual: [18000, 19500, 18800, 20200, 19600, 21000],
                forecast: [null, null, null, 20200, 20800, 22000]
            },
            daily: {
                actual: [3200, 3400, 3300, 3500, 3400, 3600],
                forecast: [null, null, null, 3500, 3550, 3700]
            }
        };

        revenueChart.data.datasets[0].data = data[period].actual;
        revenueChart.data.datasets[1].data = data[period].forecast;
        revenueChart.update();
    }

    // Function to update forecast chart based on date range
    function updateForecastChart(range) {
        // This would typically fetch new data from the server
        // For now, we'll just update the chart with dummy data
        const ranges = {
            '3 Months': {
                labels: ['Jan', 'Feb', 'Mar'],
                actual: [85000, 92000, 88000],
                forecast: [null, null, 95000]
            },
            '6 Months': {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                actual: [85000, 92000, 88000, 95000, 91000, 98000],
                forecast: [null, null, null, 95000, 97000, 102000]
            },
            '1 Year': {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                actual: [85000, 92000, 88000, 95000, 91000, 98000, 92000, 95000, 98000, 102000, 99000, 105000],
                forecast: [null, null, null, 95000, 97000, 102000, 98000, 100000, 104000, 108000, 105000, 110000]
            }
        };

        revenueChart.data.labels = ranges[range].labels;
        revenueChart.data.datasets[0].data = ranges[range].actual;
        revenueChart.data.datasets[1].data = ranges[range].forecast;
        revenueChart.update();
    }
}); 