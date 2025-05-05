// Home Page JavaScript

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Remove loading animation
    setTimeout(() => {
        document.querySelector('.loading').style.display = 'none';
    }, 500);

    // Initialize slider
    initSlider();
    
    // Initialize statistics animation
    initStatsAnimation();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize form submissions
    initForms();
    
    // Initialize chat bubble
    initChatBubble();
});

// Slider functionality
function initSlider() {
    const slider = document.querySelector('.slider');
    if (!slider) {
        console.error('Slider element not found');
        return;
    }
    
    const slides = document.querySelector('.slides');
    const slideElements = document.querySelectorAll('.slide');
    const indicators = document.querySelector('.slide-indicators');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    // Check if buttons are found
    if (!prevBtn || !nextBtn) {
        console.error('Slider buttons not found');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = slideElements.length;
    let isAnimating = false;
    let autoSlideInterval;
    
    console.log('Slider initialized with', totalSlides, 'slides');
    
    // Create indicators
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('indicator');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        indicators.appendChild(dot);
    }
    
    // Set initial position
    updateSlidePosition();
    
    // Add event listeners with explicit function references
    prevBtn.addEventListener('click', function() {
        console.log('Previous button clicked');
        prevSlide();
    });
    
    nextBtn.addEventListener('click', function() {
        console.log('Next button clicked');
        nextSlide();
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
        }
    }
    
    function updateSlidePosition() {
        if (isAnimating) return;
        
        isAnimating = true;
        
        // Add transition class
        slides.classList.add('transitioning');
        
        // Set transform with a small delay to ensure the transition works properly
        setTimeout(() => {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 10);
        
        // Update indicators
        document.querySelectorAll('.indicator').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Remove transition class after animation completes
        setTimeout(() => {
            slides.classList.remove('transitioning');
            isAnimating = false;
        }, 500);
    }
    
    function goToSlide(index) {
        if (isAnimating) return;
        currentSlide = index;
        updateSlidePosition();
        resetAutoSlide();
    }
    
    function nextSlide() {
        if (isAnimating) return;
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlidePosition();
        resetAutoSlide();
    }
    
    function prevSlide() {
        if (isAnimating) return;
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
        resetAutoSlide();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    // Start auto-slide
    startAutoSlide();
}

// Statistics animation
function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
    
    function animateStat(statElement) {
        const target = parseInt(statElement.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCount = () => {
            current += step;
            if (current < target) {
                statElement.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCount);
            } else {
                statElement.textContent = target.toLocaleString();
            }
        };
        
        updateCount();
    }
}

// Scroll to top button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// Form submissions
function initForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="bx bx-check"></i> Message Sent!';
            submitBtn.classList.add('success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('success');
            }, 3000);
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            const submitBtn = newsletterForm.querySelector('button');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="bx bx-check"></i> Subscribed!';
            submitBtn.classList.add('success');
            
            // Reset form
            newsletterForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('success');
            }, 3000);
        });
    }
}

// Chat bubble
function initChatBubble() {
    const chatBubble = document.getElementById('chatBubble');
    if (!chatBubble) return;
    
    chatBubble.addEventListener('click', () => {
        // Create chat window
        const chatWindow = document.createElement('div');
        chatWindow.className = 'chat-window';
        chatWindow.innerHTML = `
            <div class="chat-header">
                <h3>Chat with Us</h3>
                <button class="close-chat"><i class='bx bx-x'></i></button>
            </div>
            <div class="chat-messages">
                <div class="message received">
                    <p>Hello! How can we help you today?</p>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Type your message...">
                <button><i class='bx bx-send'></i></button>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(chatWindow);
        
        // Show with animation
        setTimeout(() => {
            chatWindow.classList.add('active');
        }, 10);
        
        // Focus input
        const input = chatWindow.querySelector('input');
        input.focus();
        
        // Close button
        const closeBtn = chatWindow.querySelector('.close-chat');
        closeBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
            setTimeout(() => {
                chatWindow.remove();
            }, 300);
        });
        
        // Send message
        const sendBtn = chatWindow.querySelector('.chat-input button');
        const messagesContainer = chatWindow.querySelector('.chat-messages');
        
        function sendMessage() {
            const text = input.value.trim();
            if (!text) return;
            
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'message sent';
            userMessage.innerHTML = `<p>${text}</p>`;
            messagesContainer.appendChild(userMessage);
            
            // Clear input
            input.value = '';
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Simulate response
            setTimeout(() => {
                const response = document.createElement('div');
                response.className = 'message received';
                response.innerHTML = `<p>Thank you for your message! Our team will get back to you soon.</p>`;
                messagesContainer.appendChild(response);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        }
        
        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    section.scrollIntoView({ behavior: 'smooth' });
    
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
}

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
}); 