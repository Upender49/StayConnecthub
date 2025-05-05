let currentSectionIndex = 0;
const sections = document.querySelectorAll('.section');

function showSection(index) {
    sections.forEach((section, i) => {
        section.classList.remove('active', 'previous', 'next');
        if (i === index) {
            section.classList.add('active');
        } else if (i < index) {
            section.classList.add('previous');
        } else {
            section.classList.add('next');
        }
    });
}

function nextSection(nextId) {
    const nextIndex = Array.from(sections).findIndex(s => s.id === nextId);
    if (nextIndex !== -1) {
        currentSectionIndex = nextIndex;
        showSection(currentSectionIndex);
    }
}

function prevSection(prevId) {
    const prevIndex = Array.from(sections).findIndex(s => s.id === prevId);
    if (prevIndex !== -1) {
        currentSectionIndex = prevIndex;
        showSection(currentSectionIndex);
    }
}

function _termsAgreed() {
    return document.getElementById('agree').checked;
}

function _createAccount() {
    if (!_termsAgreed()) {
        alert('Please agree to the terms and conditions');
        return;
    }

    // Get the main registration form
    const form = document.getElementById('registration-form');
    if (!form) {
        console.error('Registration form not found');
        alert('Error: Registration form not found');
        return;
    }

    const formData = new FormData(form);

    // Add data from other sections if they exist
    const hostelDetails = document.querySelector('#hostel-details form');
    const roomDetails = document.querySelector('#room-details form');
    const amenities = document.querySelector('#amenities form');

    try {
        // Add hostel details if the section exists
        if (hostelDetails) {
            const hostelFields = ['hostel_name', 'hostel_type', 'hostel_description', 'landmarks'];
            hostelFields.forEach(field => {
                const input = hostelDetails.querySelector(`[name="${field}"]`);
                if (input) formData.append(field, input.value);
            });
        }

        // Add room details if the section exists
        if (roomDetails) {
            const roomFields = ['number_of_rooms', 'room_types', 'room_pricing', 'availability_status'];
            roomFields.forEach(field => {
                const input = roomDetails.querySelector(`[name="${field}"]`);
                if (input) formData.append(field, input.value);
            });
        }

        // Add amenities if the section exists
        if (amenities) {
            const amenityFields = ['wifi', 'parking', 'laundry', 'security_features', 'common_areas', 'bathroom_type'];
            amenityFields.forEach(field => {
                const input = amenities.querySelector(`[name="${field}"]`);
                if (input) formData.append(field, input.value);
            });
        }

        // Log form data for debugging
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        // Submit the form
        fetch('../php/owner_register.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log('Server response:', data);
            try {
                const result = JSON.parse(data);
                if (result.success) {
                    window.location.href = 'dashboard.php';
                } else {
                    alert(result.message || 'Registration failed. Please try again.');
                }
            } catch (e) {
                console.error('Error parsing server response:', e);
                alert('Registration failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        });
    } catch (error) {
        console.error('Error collecting form data:', error);
        alert('Error collecting form data. Please try again.');
    }
}

// Initialize the form when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    showSection(currentSectionIndex);
});
