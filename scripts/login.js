document.getElementById('continue-button').addEventListener('click', function() {
    const email = document.getElementById('email').value.trim();  //trim to remove whitespaces
    if (email) {
        window.location.href = `pass.html?email=${encodeURIComponent(email)}`;
    } else {
        alert('Please enter your email.');
    }
});

document.getElementById('new-acc').addEventListener('click', function() {
    window.location.href = 'signup.html';
});
