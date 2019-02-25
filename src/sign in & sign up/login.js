//global http headers
const fetchHeaders = new Headers();
fetchHeaders.append('Content-Type', 'application/json');

const login_form = document.getElementById('login_form');

const aanmeld_btn_anim = document.getElementById('aanmeld_btn_anim');
const inschrijf_btn_anim = document.getElementById('inschrijf_btn_anim');
const aanmeld_btn_text = document.getElementById('aanmeld_btn_text');
const inschrijf_btn_text = document.getElementById('inschrijf_btn_text');

login_form.addEventListener('submit', (event) => {
    aanmeld_btn_anim.classList.add("spinner-grow");
    aanmeld_btn_anim.classList.add("spinner-grow-sm");
    aanmeld_btn_text.innerHTML = "Momentje...";

    const gebruiker = {};
    gebruiker['gebruikers_naam'] = document.getElementById('gebruikers_naam_login').value;
    gebruiker['wachtwoord'] = document.getElementById('wachtwoord_login').value;

    fetch(`https://productivv-backend.herokuapp.com/gebruikers/${ gebruiker['gebruikers_naam'] }`, {
        method: 'GET',
        headers: fetchHeaders
    }).then(res => {
        res.json().then(data => {
            if (data == null) {
                alert('Gebruiker bestaat niet');

                aanmeld_btn_anim.classList.remove("spinner-grow");
                aanmeld_btn_anim.classList.remove("spinner-grow-sm");
                aanmeld_btn_text.innerHTML = "Aanmelden";
            } else {
                const checkpw = {};
                checkpw['gebruikers_naam'] = data.gebruikers_naam;
                checkpw['wachtwoord'] = gebruiker['wachtwoord'];

                fetch('https://productivv-backend.herokuapp.com/gebruikers/check_password', {
                    method: 'POST',
                    body: JSON.stringify(checkpw),
                    headers: fetchHeaders
                }).then(res => {
                    res.json().then(check => {
                        if (check === false) {
                            alert("Wachtwoord is niet correct!");

                            aanmeld_btn_anim.classList.remove("spinner-grow");
                            aanmeld_btn_anim.classList.remove("spinner-grow-sm");
                            aanmeld_btn_text.innerHTML = "Aanmelden";
                        } else {
                            localStorage.setItem("gebruikers_id", data.gebruikers_id);
                            localStorage.setItem("gebruikers_naam", data.gebruikers_naam);
                            window.location.replace("./src/dashboard.html");
                        }
                    }).catch(e => console.log(e));
                }).catch(e => console.log(e));

            }
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));

    event.preventDefault();
}, true);


const signup_form = document.getElementById('signup_form');

signup_form.addEventListener('submit', (event) => {
    inschrijf_btn_anim.classList.add("spinner-grow");
    inschrijf_btn_anim.classList.add("spinner-grow-sm");
    inschrijf_btn_text.innerHTML = "Momentje...";

    const gebruiker = {};
    gebruiker['voornaam'] = document.getElementById('voornaam').value;
    gebruiker['achternaam'] = document.getElementById('achternaam').value;
    gebruiker['gebruikers_naam'] = document.getElementById('gebruikers_naam').value;
    gebruiker['wachtwoord'] = document.getElementById('wachtwoord').value;
    gebruiker['email'] = document.getElementById('email').value;

    let wachtwoord_verifieren = document.getElementById('verifieer_wachtwoord').value;

    if (wachtwoord_verifieren.length < 8 || gebruiker['wachtwoord'].length < 8) {
        alert("wachtwoord moet meer dan 8 karakters bevatten.");

        inschrijf_btn_anim.classList.remove("spinner-grow");
        inschrijf_btn_anim.classList.remove("spinner-grow-sm");
        inschrijf_btn_text.innerHTML = "Inschrijven";
    } else {
        if (gebruiker['wachtwoord'] === wachtwoord_verifieren) {
            fetch('https://productivv-backend.herokuapp.com/gebruikers/create', {
                method: 'POST',
                body: JSON.stringify(gebruiker),
                headers: fetchHeaders
            }).then(res => {
                document.getElementById('tab-1').checked = true;
                document.getElementById('tab-2').checked = false;
                alert("Inschrijven Succesvol!");

                inschrijf_btn_anim.classList.remove("spinner-grow");
                inschrijf_btn_anim.classList.remove("spinner-grow-sm");
                inschrijf_btn_text.innerHTML = "Inschrijven";
            }).catch(e => console.log(e));
        } else {
            alert("Wachtwoorden komen niet overeen.");

            inschrijf_btn_anim.classList.remove("spinner-grow");
            inschrijf_btn_anim.classList.remove("spinner-grow-sm");
            inschrijf_btn_text.innerHTML = "Inschrijven";
        }
    }

    event.preventDefault();
}, true);