// Toggle Other Interest Input
function toggleOtherInterest(checkbox) {
    const otherInputDiv = document.getElementById('other_interest_div');
    if (checkbox.checked) {
        otherInputDiv.classList.remove('hidden');
    } else {
        otherInputDiv.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const batchSelect = document.getElementById('batch');
    const subBatchSelect = document.getElementById('sub_batch');
    const registerForm = document.getElementById('registerForm');

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate Email Domain
            const emailInput = document.getElementById('reg_email');
            const emailError = document.getElementById('email_error');
            const email = emailInput.value.trim();

            // Reset error
            emailError.classList.add('hidden');
            emailInput.classList.remove('border-red-500');

            if (!email.endsWith('@iiitkota.ac.in')) {
                emailError.textContent = 'Registration is restricted to IIIT Kota students (@iiitkota.ac.in).';
                emailError.classList.remove('hidden');
                emailInput.classList.add('border-red-500');
                return;
            }

            // Collect Form Data
            const name = document.getElementById('reg_name').value;
            const id = document.getElementById('reg_id').value;
            const year = document.getElementById('year').value;
            const dept = document.getElementById('department').value;

            // Collect Interests
            const checkboxes = document.querySelectorAll('input[name="interest"]:checked');
            let interests = [];
            checkboxes.forEach((checkbox) => {
                if (checkbox.value === 'Others') {
                    const otherVal = document.getElementById('other_interest').value;
                    if (otherVal) interests.push(otherVal);
                } else {
                    interests.push(checkbox.value);
                }
            });

            if (interests.length === 0) {
                alert('Please select at least one interest.');
                return;
            }

            // Save to LocalStorage (Simulate Backend)
            localStorage.setItem('peerSync_userName', name);
            localStorage.setItem('peerSync_userID', id);
            localStorage.setItem('peerSync_userEmail', email);
            localStorage.setItem('peerSync_userYear', year);
            localStorage.setItem('peerSync_userDept', dept);
            localStorage.setItem('peerSync_userInterests', JSON.stringify(interests));

            alert('Registration Successful! Redirecting to Login...');
            window.location.href = 'student_login.html';
        });
    }

    const subBatchOptions = {
        'A': ['A1', 'A2', 'A3'],
        'B': ['B1', 'B2', 'B3'],
        'C': ['C1', 'C2', 'C3'],
        'D': ['D1', 'D2']
    };

    if (batchSelect) {
        batchSelect.addEventListener('change', function () {
            const selectedBatch = this.value;

            // Clear existing options
            subBatchSelect.innerHTML = '<option value="" disabled selected>Select Sub Batch</option>';

            if (selectedBatch && subBatchOptions[selectedBatch]) {
                // Enable the select
                subBatchSelect.disabled = false;

                // Add new options
                subBatchOptions[selectedBatch].forEach(function (subBatch) {
                    const option = document.createElement('option');
                    option.value = subBatch;
                    option.textContent = subBatch;
                    subBatchSelect.appendChild(option);
                });
            } else {
                // Disable if no batch selected
                subBatchSelect.disabled = true;
                subBatchSelect.innerHTML = '<option value="" disabled selected>Select Batch First</option>';
            }
        });
    }
});
