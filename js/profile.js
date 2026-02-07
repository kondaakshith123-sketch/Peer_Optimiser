document.addEventListener('DOMContentLoaded', () => {
    const name = localStorage.getItem('peerSync_userName');
    const email = localStorage.getItem('peerSync_userEmail');
    const year = localStorage.getItem('peerSync_userYear');
    const dept = localStorage.getItem('peerSync_userDept');
    const interestsStr = localStorage.getItem('peerSync_userInterests');

    if (name) {
        document.getElementById('profile-name').textContent = name;
        const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        document.getElementById('profile-avatar').textContent = initials;
    }

    if (email) document.getElementById('profile-email').textContent = email;
    if (year) document.getElementById('profile-year').textContent = year;
    if (dept) document.getElementById('profile-dept').textContent = dept;

    if (interestsStr) {
        const interests = JSON.parse(interestsStr);
        if (interests.length > 0) {
            document.getElementById('profile-bio').textContent = `Passionate about ${interests.join(', ')} and technology.`;

            const interestsContainer = document.getElementById('profile-interests-list');
            if (interestsContainer) {
                interestsContainer.innerHTML = ''; // Clear default

                interests.forEach(interest => {
                    const tag = document.createElement('div');
                    tag.className = 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-full text-sm flex items-center gap-2 cursor-pointer transition-colors group';
                    tag.innerHTML = `
                        ${interest}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-slate-400 group-hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    `;
                    interestsContainer.appendChild(tag);
                });
            }
        }
    } else {
        // Fallback for old data format or no interests
        const oldInterest = localStorage.getItem('peerSync_userInterest');
        if (oldInterest) {
            document.getElementById('profile-bio').textContent = `Passionate about ${oldInterest} and technology.`;
            const interestsContainer = document.getElementById('profile-interests-list');
            if (interestsContainer) {
                interestsContainer.innerHTML = '';
                const tag = document.createElement('div');
                tag.className = 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-full text-sm flex items-center gap-2 cursor-pointer transition-colors group';
                tag.innerHTML = `${oldInterest} ...`;
                interestsContainer.appendChild(tag);
            }
        }
    }
});
