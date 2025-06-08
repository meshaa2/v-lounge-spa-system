import { auth } from './firebase-config.js';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');
const logoutButton = document.getElementById('logoutButton');

// Set the page to redirect to after login
// Change this to 'clients.html' if you want to redirect there instead
const postLoginRedirect = 'dashboard.html';

// Check authentication state
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        window.location.href = postLoginRedirect;
    } else {
        // User is signed out
        if (window.location.pathname !== '/index.html') {
            window.location.href = 'index.html';
        }
    }
});

// Login function
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value;
        const password = passwordInput.value;
        
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log('Logged in user:', user.email);
            window.location.href = postLoginRedirect;
        } catch (error) {
            console.error('Login error:', error);
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
        }
    });
}

// Logout function
if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        try {
            await auth.signOut();
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout error:', error);
        }
    });
}

// Password reset function
const resetPassword = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert('Password reset email sent!');
    } catch (error) {
        console.error('Password reset error:', error);
        throw error;
    }
};

// Export functions
export { resetPassword }; 