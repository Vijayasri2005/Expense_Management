// Show signup form
document.getElementById('showSignup').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
});

// Show login form
document.getElementById('showLogin').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
});

// Handle Login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
        .then(data => {
            console.log('Login Response:', data); // Debug line

            if (data.token) {
                alert('Login successful!');
                localStorage.setItem('token', data.token);
                window.location.href = 'dashboard.html';
            } else {
                alert(data.message || 'Invalid credentials');
            }
        })
        .catch(err => {
            console.error('Login Error:', err);
            alert('An error occurred during login.');
        });
});

// Handle Signup
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    })
        .then(res => res.json())
        .then(data => {
            console.log('Signup Response:', data); // Debug line

            if (data.token) {
                alert('Signup successful!');
                localStorage.setItem('token', data.token);
                window.location.href = 'dashboard.html';
            } else {
                alert(data.message || 'Signup failed.');
            }
        })
        .catch(err => {
            console.error('Signup Error:', err);
            alert('An error occurred during signup.');
        });
});
// Handle CSV Download
document.getElementById('exportCsvBtn').addEventListener('click', function () {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to download your expenses.');
        return;
    }

    fetch('http://localhost:5000/api/expenses/export/csv', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) throw new Error('Download failed');
            return response.blob();
        })
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'expenses.csv';
            link.click();
        })
        .catch(error => console.error('CSV Download Error:', error));
});
// Handle PDF Download
document.getElementById('exportPdfBtn').addEventListener('click', function () {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to download your expenses.');
        return;
    }

    fetch('http://localhost:5000/api/expenses/export/pdf', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) throw new Error('Download failed');
            return response.blob();
        })
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'expenses.pdf';
            link.click();
        })
        .catch(error => console.error('PDF Download Error:', error));
});

