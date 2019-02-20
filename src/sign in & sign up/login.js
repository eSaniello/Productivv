//global http headers
const fetchHeaders = new Headers();
fetchHeaders.append('Content-Type', 'application/json');

const login_form = document.getElementById('login_form');

login_form.addEventListener('submit', (event) => {

    const gebruiker = {};
    gebruiker['gebruikers_naam'] = document.getElementById('gebruikers_naam_login').value;
    gebruiker['wachtwoord'] = document.getElementById('wachtwoord_login').value;

    fetch(`https://productivv-backend.herokuapp.com/gebruikers/${ gebruiker['gebruikers_naam'] }`, {
        method: 'GET',
        headers: fetchHeaders
    }).then(res => {
        res.json().then(data => {
            if (data == null) {
                alert('Gebruiker bestaat niet')
            } else {

                console.log(data);
            }
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));

    event.preventDefault();
}, true);


const signup_form = document.getElementById('signup_form');

signup_form.addEventListener('submit', (event) => {

    const gebruiker = {};
    gebruiker['voornaam'] = document.getElementById('voornaam').value;
    gebruiker['achternaam'] = document.getElementById('achternaam').value;
    gebruiker['gebruikers_naam'] = document.getElementById('gebruikers_naam').value;
    gebruiker['wachtwoord'] = document.getElementById('wachtwoord').value;
    gebruiker['email'] = document.getElementById('email').value;

    let wachtwoord_verifieren = document.getElementById('verifieer_wachtwoord').value;

    if (wachtwoord_verifieren.length < 8 || gebruiker['wachtwoord'].length < 8) {
        alert("wachtwoord moet meer dan 8 karakters bevatten.");
    } else {
        if (gebruiker['wachtwoord'] === wachtwoord_verifieren) {
            fetch('https://productivv-backend.herokuapp.com/gebruikers/create', {
                method: 'POST',
                body: JSON.stringify(gebruiker),
                headers: fetchHeaders
            }).then(res => {
                let tab_1 = document.getElementById('tab-1').checked = true;
                let tab_2 = document.getElementById('tab-2').checked = false;
                alert("Inschrijven Succesvol!");
            }).catch(e => console.log(e));
        } else {
            alert("Wachtwoorden komen niet overeen.");
        }
    }

    event.preventDefault();
}, true);