document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('admin-login');
    
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'bhargavgouri@96' && password === 'bhargav@96') {
            alert('Login successful');
            location.href = 'admin-dashboard.html'; // Replace with the actual admin dashboard URL
        } else {
            alert('Invalid credentials');
        }
    });
});
