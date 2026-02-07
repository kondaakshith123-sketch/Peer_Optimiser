function handleLogin(event) {
    event.preventDefault();
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email_error');
    const email = emailInput.value.trim();
    const password = document.getElementById('password').value;

    // Reset Validation
    emailError.classList.add('hidden');
    emailInput.classList.remove('border-red-500');

    if (!email.endsWith('@iiitkota.ac.in')) {
        emailError.textContent = 'Login is restricted to IIIT Kota students (@iiitkota.ac.in).';
        emailError.classList.remove('hidden');
        emailInput.classList.add('border-red-500');
        return;
    }

    if (email && password) {
        // In a real app, we would verify credentials here.
        // For this prototype, we check if the user has registered locally or just allow access.
        // We will just update the email in localStorage to ensure the session is "current".
        localStorage.setItem('peerSync_userEmail', email); 
        
        // We don't overwrite other details (Name, etc.) because we expect them to be set 
        // during registration. If they are missing, the dashboard might look empty, 
        // but that's the limitation of a frontend-only prototype.
        
        window.location.href = 'student_dashboard.html';
    } else {
        alert('Please fill in all fields');
    }
}
