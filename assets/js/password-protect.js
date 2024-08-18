document.getElementById('login-button').addEventListener('click', function () {
    var password = document.getElementById('password').value;
    login(password);
});

function login(secret) {
    var hash = sha1(secret);  // Hash the password using SHA-1
    var url = hash + '/index.html';  // Construct the URL based on the hash
    var alert = document.querySelectorAll('[data-id="alert"]');

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            let nva = new Date().getTime() + 300_000;  // Set link to be valid for 1 second
            window.location = url + "?nva=" + nva;
        } else {
            alert[0].style.display = 'block';
            document.getElementById('password').setAttribute('placeholder', 'Incorrect password');
            document.getElementById('password').value = '';
        }
    };
    request.onerror = function () {
        alert[0].style.display = 'block';
        document.getElementById('password').setAttribute('placeholder', 'Incorrect password');
        document.getElementById('password').value = '';
    };
    request.send();
}
