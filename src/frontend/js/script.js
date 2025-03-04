async function requestAppLogin() {
    const email = document.getElementById('email').value;
    const msg = document.getElementById('message');
    try {
        const response = await fetch('/api/request-login-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });

        const result = await response.json();
        message.textContent = result.message;

        if (response.ok) {
            document.getElementById('email-form').style.display = 'none'; // Hide the form
        }
    } catch (error) {
        console.error('Error requesting login link:', error);
        message.textContent = 'An error occurred. Please try again.';
    }
}

window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
        try {
            const response = await fetch('/api/verify-jwt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('jwtToken', result.token);  //Store the JWT in Local Storage
                window.location.href = "/profile.html"  //Redirect to profile page
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error verifying JWT:', error);
            alert('An error occurred while verifying the link.');
        }
    }
};