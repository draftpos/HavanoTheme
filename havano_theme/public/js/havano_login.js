/**
 * Havano Theme - Login Page Enhancements
 * Handles login page interactions and signup form
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize login page enhancements
    initLoginEnhancements();
});

function initLoginEnhancements() {
    // Handle signup form visibility
    handleSignupForm();
    
    // Handle form animations
    handleFormAnimations();
    
    // Handle theme-specific styling
    handleThemeStyling();
}

function handleSignupForm() {
    // Show signup form when signup link is clicked
    const signupLinks = document.querySelectorAll('a[href="#signup"]');
    signupLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupForm();
        });
    });
    
    // Show login form when login link is clicked
    const loginLinks = document.querySelectorAll('a[href="#login"]');
    loginLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });
    });
}

function showSignupForm() {
    // Hide all sections
    const sections = document.querySelectorAll('.for-login, .for-email-login, .for-forgot, .for-login-with-email-link');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show signup section
    const signupSection = document.querySelector('.for-signup');
    if (signupSection) {
        signupSection.style.display = 'block';
        signupSection.classList.remove('signup-disabled');
        
        // Show the signup form
        const signupForm = signupSection.querySelector('.form-signup');
        if (signupForm) {
            signupForm.classList.remove('hide');
        }
    }
}

function showLoginForm() {
    // Hide all sections
    const sections = document.querySelectorAll('.for-signup, .for-email-login, .for-forgot, .for-login-with-email-link');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show login section
    const loginSection = document.querySelector('.for-login');
    if (loginSection) {
        loginSection.style.display = 'block';
    }
}

function handleFormAnimations() {
    // Add smooth transitions to form sections
    const sections = document.querySelectorAll('.for-login, .for-signup, .for-email-login, .for-forgot, .for-login-with-email-link');
    sections.forEach(section => {
        section.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}

function handleThemeStyling() {
    // Apply theme-specific styling to signup form
    const theme = getCurrentTheme();
    if (theme && theme !== 'default') {
        applyThemeToSignupForm(theme);
    }
}

function getCurrentTheme() {
    // Try to get theme from data attribute
    const themeData = document.querySelector('[data-havano-theme]');
    if (themeData) {
        return themeData.getAttribute('data-havano-theme');
    }
    
    // Try to get theme from localStorage
    const storedTheme = localStorage.getItem('havano-theme');
    if (storedTheme) {
        return storedTheme;
    }
    
    return 'default';
}

function applyThemeToSignupForm(theme) {
    const signupSection = document.querySelector('.for-signup');
    if (signupSection) {
        signupSection.setAttribute('data-havano-theme', theme);
    }
}

// Export functions for external use
window.havanoLogin = {
    showSignupForm,
    showLoginForm,
    getCurrentTheme
};
