// check if the localstorage item is defined
// localStorage.getItem("gebruikers_naam") ?
//     (document.getElementsByClassName(
//         "username_setter"
//     )[0].innerHTML = localStorage.getItem("gebruikers_naam")) :
//     "";

//
function log_off() {
    localStorage.clear();
    window.location.replace("../index.html");
}

// total amount
//     complete taken
//     todo

// Data.takens

fetch(
        `https://productivv-backend.herokuapp.com/gebruikers/${localStorage.getItem(
    "gebruikers_naam"
  )}`, {
            method: "GET",
            headers: fetchHeaders
        }
    )
    .then(res => {
        res
            .json()
            .then(data => {

                document.getElementsByClassName(
                    "username_setter"
                )[0].innerHTML = data.voornaam + " " + data.achternaam;


                //Alle gebruikers gegevens zitten in de data variabel
                let alldata = data.takens;
                let array_Length_alldata = alldata.length;
                for (let i = 0; i < array_Length_alldata; i++) {
                    // console.log(alldata[i].titel);
                }
            })
            .catch(e => console.log(e));
    })
    .catch(e => console.log(e));

// types in query , is een onchange , check if is part of the values of the array, if it is then you can click on it and itll take u to the editable version

// modal

function openMod() {
    document.getElementById("myModal").style.display = "block";
}


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

document.getElementById("gebruikersnaam_edit").innerHTML = localStorage.getItem("gebruikers_naam");