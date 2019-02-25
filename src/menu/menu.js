//log out
function log_off() {
    localStorage.clear();
    window.location.replace("../index.html");
}

form_instellingen = document.getElementById('form_instellingen');

modalInstellingen = document.getElementById("myModal01");

instellingenCloseBtn = document.getElementsByClassName("closeModal")[0];

instellingenCloseBtn.onclick = () => {
    modalInstellingen.style.display = "none";
}

//get data and fill in the text inputfields
fetch(`https://productivv-backend.herokuapp.com/gebruikers/${localStorage.getItem("gebruikers_naam")}`, {
    method: "GET",
    headers: fetchHeaders
}).then(res => {
    res.json().then(data => {

        document.getElementsByClassName("username_setter")[0].innerHTML = data.voornaam + " " + data.achternaam;

        document.getElementById("voornaam_id").value = data.voornaam;
        document.getElementById("achternaam_id").value = data.achternaam;
        document.getElementById("email_id").value = data.email;
    }).catch(e => console.log(e));
}).catch(e => console.log(e));

//open modal
function openMod() {
    modalInstellingen.style.display = "block";
}

//update user
form_instellingen.addEventListener('submit', (event) => {
    const gebruiker = {};
    gebruiker['voornaam'] = document.getElementById("voornaam_id").value;
    gebruiker['achternaam'] = document.getElementById("achternaam_id").value;
    gebruiker['wachtwoord'] = document.getElementById("wachtwoord_id").value;
    gebruiker['email'] = document.getElementById("email_id").value;
    gebruiker['gebruikers_id'] = localStorage.getItem('gebruikers_id');

    fetch(`https://productivv-backend.herokuapp.com/gebruikers`, {
        method: "PUT",
        headers: fetchHeaders,
        body: JSON.stringify(gebruiker)
    }).then(res => {
        console.log(res.json());

        modalInstellingen.style.display = "none";
        alert("Voltooid!");
        //reload the page to load new entries in database
        location.reload();
    }).catch(e => console.log(e));

    event.preventDefault();
}, true);


// STATS
// var options = {
//     chart: {
//         type: "donut"
//     },
//     series: [44, 55, 41, 17, 15],
//     responsive: [{
//         breakpoint: 480,
//         options: {
//             chart: {
//                 width: 10
//             },
//             legend: {
//                 position: "bottom"
//             }
//         }
//     }]
// };

// var chart = new ApexCharts(document.querySelector("#chart"), options);

// chart.render();