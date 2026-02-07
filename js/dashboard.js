document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('peerSync_userName');
    if (userName) {
        const nameElement = document.getElementById('user-name-display');
        if (nameElement) {
            nameElement.textContent = userName;
        }
        const avatarElement = document.getElementById('user-avatar-display');
        if (avatarElement) {
            avatarElement.textContent = userName.charAt(0).toUpperCase();
        }
    }
});
