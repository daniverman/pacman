function loginClick() {
    var loginform = document.getElementById('login');
    var welcomepage = document.getElementById('welcome');

    if (loginform.style.display === 'none') {
        loginform.style.display = 'block';
        welcomepage.style.display = 'none';
    } else {
        loginform.style.display = 'none';
    }
}

function signInClick() {
    var signinform = document.getElementById('registration');
    var welcomepage = document.getElementById('welcome');

    if (signinform.style.display === 'none') {
        signinform.style.display = 'block';
        welcomepage.style.display = 'none';
    } else {
        signinform.style.display = 'none';
    }
}

function welcomeClick() {
    var welcomepage = document.getElementById('welcome');
    var engamepage = document.getElementById('endGame');
    var signinform = document.getElementById('registration');
    var loginform = document.getElementById('login');
    var gamepage = document.getElementById('game');
    var proppage = document.getElementById('gameProperties');

    if (welcomepage.style.display === 'none') {
        welcomepage.style.display = 'block';
        signinform.style.display = 'none';
        loginform.style.display = 'none';
        gamepage.style.display = 'none';
        proppage.style.display = 'none';
        engamepage.style.display = 'none';

    } else {
        signinform.style.display = 'none';
    }

}

function loginnavClick() {
    var welcomepage = document.getElementById('welcome');
    var signinform = document.getElementById('registration');
    var loginform = document.getElementById('login');
    var gamepage = document.getElementById('game');
    var proppage = document.getElementById('gameProperties');

    if (loginform.style.display === 'none') {
        loginform.style.display = 'block';
        signinform.style.display = 'none';
        welcomepage.style.display = 'none';
        gamepage.style.display = 'none';
        proppage.style.display = 'none';
    } else {
        loginform.style.display = 'none';
    }
}

function signinnavClick() {
    var welcomepage = document.getElementById('welcome');
    var signinform = document.getElementById('registration');
    var loginform = document.getElementById('login');
    var gamepage = document.getElementById('game');
    var proppage = document.getElementById('gameProperties');

    if (signinform.style.display === 'none') {
        signinform.style.display = 'block';
        loginform.style.display = 'none';
        welcomepage.style.display = 'none';
        gamepage.style.display = 'none';
        proppage.style.display = 'none';

    } else {
        signinform.style.display = 'none';
    }
}

function startPlay() {
    var proppage = document.getElementById('gameProperties');
    var gamepage = document.getElementById('game');
    if (gamepage.style.display === 'none') {
        document.getElementById("startInput").value = 2;
        gamepage.style.display = 'block';
        proppage.style.display = 'none';
    } else {
        gamepage.style.display = 'none';
    }
}
