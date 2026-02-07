document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:5000/api';
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'student_login.html';
        return;
    }

    // Fetch User Profile
    async function fetchProfile() {
        try {
            const res = await fetch(`${API_URL}/profile/me`, {
                headers: { 'x-auth-token': token }
            });

            if (!res.ok) throw new Error('Failed to fetch profile');

            const profile = await res.json();
            const userName = profile.fullName || profile.userId.name; // Fallback to User model name

            const nameElement = document.getElementById('user-name-display');
            if (nameElement) nameElement.textContent = userName;

            const avatarElement = document.getElementById('user-avatar-display');
            if (avatarElement) avatarElement.textContent = userName.charAt(0).toUpperCase();

        } catch (err) {
            console.error(err);
            // Optionally redirect to login if 401
        }
    }

    // Fetch Free Slots (Example Usage)
    async function fetchFreeSlots() {
        try {
            const res = await fetch(`${API_URL}/timetable/free-slots?day=MON`, { // Default to MON for demo
                headers: { 'x-auth-token': token }
            });
            const data = await res.json();
            console.log('Free Slots:', data);
            // Here you would update the UI with free slots
        } catch (err) {
            console.error(err);
        }
    }

    fetchProfile();
    fetchFreeSlots();
});
