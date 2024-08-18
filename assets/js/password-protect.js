// password-protect.js
document.getElementById('login-button').addEventListener('click', function () {
    var password = document.getElementById('password').value;
    login(password);
});

function login(secret) {
    var hash = sha1(secret);  // Hash the password using SHA-1
    var url = 'protected/' + hash + '/index.html';  // Construct the URL
    var alert = document.querySelectorAll('[data-id="alert"]');

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            window.location = url;  // Redirect to the protected page if the password is correct
        } else {
            parent.location.hash = hash;
            alert[0].style.display = 'block';
            document.getElementById('password').setAttribute('placeholder', 'Incorrect password');
            document.getElementById('password').value = '';
        }
    };
    request.onerror = function () {
        parent.location.hash = hash;
        alert[0].style.display = 'block';
        document.getElementById('password').setAttribute('placeholder', 'Incorrect password');
        document.getElementById('password').value = '';
    };
    request.send();
}

