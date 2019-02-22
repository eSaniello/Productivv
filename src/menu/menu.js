// check if the localstorage item is defined
localStorage.getItem("gebruikers_naam") ?
    (document.getElementsByClassName(
        "username_setter"
    )[0].innerHTML = localStorage.getItem("gebruikers_naam")) :
    "";

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
                //Alle gebruikers gegevens zitten in de data variabel
                let alldata = data.takens;
                let array_Length_alldata = alldata.length;
                for (let i = 0; i < array_Length_alldata; i++) {
                    console.log(alldata[i].titel);
                }
            })
            .catch(e => console.log(e));
    })
    .catch(e => console.log(e));

// types in query , is een onchange , check if is part of the values of the array, if it is then you can click on it and itll take u to the editable version


// STATS 
//doughnut
var ctxD = document.getElementById("doughnutChart").getContext('2d');
var myLineChart = new Chart(ctxD, {
    type: 'doughnut',
    data: {
        labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
        datasets: [{
            data: [300, 50, 100, 40, 120],
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
            hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
        }]
    },
    options: {
        responsive: true
    }
});