document.addEventListener('DOMContentLoaded', () => {
    let registerForm = document.getElementById('registerFormElement');
    let googleBtn = document.querySelector('.google-btn');
    let closeBtn = document.querySelector('.close-icon');
    let overlay = document.querySelector('.overlay');
    let popupContainer = document.querySelector('.popup-container');
    let switchFormLinks = document.querySelectorAll('.switch-form');

    switchFormLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            window.location.href = "login.html"; 
        });
    });

    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.style.opacity = '0';
        popupContainer.style.transform = 'translateY(20px)';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    });

    popupContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    overlay.addEventListener('click', () => {
        closeBtn.click();
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let name = document.getElementById('name').value.trim();
        let email = document.getElementById('registerEmail').value.trim();
        let password = document.getElementById('registerPassword').value.trim();
        let confirmPassword = document.getElementById('confirmPassword').value.trim();

        if (!name || !email || !password || !confirmPassword) {
            showError('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            showError('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        console.log('Register form submitted:', { name, email, password });
        showSuccess('Account created successfully!');
        registerForm.reset();
    });

    googleBtn.addEventListener('click', () => {
        console.log('Google sign in clicked');
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(message) {
        let messageDiv = document.createElement('div');
        messageDiv.className = 'message error';
        messageDiv.textContent = message;
        insertMessage(messageDiv);
    }

    function showSuccess(message) {
        let messageDiv = document.createElement('div');
        messageDiv.className = 'message success';
        messageDiv.textContent = message;
        insertMessage(messageDiv);
    }

    function insertMessage(messageDiv) {
        let existingMessage = document.querySelector('.message');
        if (existingMessage) existingMessage.remove();

        let activeForm = document.querySelector('.form.active');
        let submitBtn = activeForm.querySelector('.signup-btn');
        submitBtn.parentElement.insertBefore(messageDiv, submitBtn);

        setTimeout(() => messageDiv.remove(), 3000);
    }
});