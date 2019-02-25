//global http headers
const fetchHeaders = new Headers();
fetchHeaders.append('Content-Type', 'application/json');

let modal = document.getElementById('myModal');

let headerText = document.getElementById('headertext');
let submitBtn = document.getElementById('submitBtn');

let btn = document.getElementById("myBtn");

let span = document.getElementsByClassName("closeModal")[1];

btn.onclick = () => {
    headerText.innerHTML = "Nieuwe Taak";
    modal.style.display = "block";
    submitBtn.innerHTML = "Creeer Taak";
    document.getElementById('titel').value = null;
    document.getElementById('omschrijving').value = null;
    document.getElementById('opleveringsdatum').value = null;
    document.getElementById('prioriteit').value = null;
    document.getElementById('categorie').value = null;
}

span.onclick = () => {
    modal.style.display = "none";
}

//wanneer de gebruiker ergens op de background klikt sluit het venster
// window.onclick = (event) => {
//     if (event.target == modal) {
//          modal.style.display = "none";
//     }
// }

//backend api call
const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
    if (submitBtn.innerHTML === "Creeer Taak") {
        const taak = {};

        taak['titel'] = document.getElementById('titel').value;
        taak['omschrijving'] = document.getElementById('omschrijving').value;
        taak['opleverings_datum'] = document.getElementById('opleveringsdatum').value;
        taak['prioriteit'] = document.getElementById('prioriteit').value;
        taak['categorie'] = document.getElementById('categorie').value;
        //dynamisch achterhalen in full app.
        taak['fk_gebruikers_id'] = localStorage.getItem("gebruikers_id");;

        console.log(taak);

        fetch('https://productivv-backend.herokuapp.com/taken/create', {
            method: 'POST',
            body: JSON.stringify(taak),
            headers: fetchHeaders
        }).then(res => {
            console.log(res);
            modal.style.display = "none";
            //reload the page to load new entries in database
            location.reload();
        }).catch(e => console.log(e));
    } else {
        const taak = {};

        taak['titel'] = document.getElementById('titel').value;
        taak['omschrijving'] = document.getElementById('omschrijving').value;
        taak['opleverings_datum'] = document.getElementById('opleveringsdatum').value;
        taak['prioriteit'] = document.getElementById('prioriteit').value;
        taak['categorie'] = document.getElementById('categorie').value;
        taak['taak_id'] = form.classList.value;

        console.log(taak);

        fetch('https://productivv-backend.herokuapp.com/taken', {
            method: 'PUT',
            body: JSON.stringify(taak),
            headers: fetchHeaders
        }).then(res => {
            console.log(res);
            modal.style.display = "none";
            //reload the page to load new entries in database
            location.reload();
        }).catch(e => console.log(e));
    }

    event.preventDefault();
}, true);


fetch(`https://productivv-backend.herokuapp.com/gebruikers/${ localStorage.getItem("gebruikers_naam") }`, {
    method: 'GET',
    headers: fetchHeaders
}).then(res => {
    res.json().then(data => {

        for (let j = 0; j < data.takens.length; j++) {

            if (data.takens[j].categorie != null && data.takens[j].prioriteit != null) {

                // Create a new list item when clicking on the "Add" button
                let li = document.createElement("li");
                let t = document.createTextNode(data.takens[j].titel);
                li.appendChild(t);
                li.classList.add(data.takens[j].taak_id);

                let today = new Date();
                let one_day = 1000 * 60 * 60 * 24;
                let deadline_datum = new Date(data.takens[j].opleverings_datum);
                let diff = Math.ceil((deadline_datum.getTime() - today.getTime()) / (one_day));

                if (diff >= 5) {
                    li.style.backgroundColor = '#228e4b';
                }
              
                if (diff >= 2 && diff <= 4) {
                    li.style.backgroundColor = '#f18805';
                }
                
                if(diff <= 1){
                    li.style.backgroundColor = '#ad361f';
                }

                let completedList = document.getElementById('completedlist');

                if (data.takens[j].compleet == false)
                    document.getElementById("todolist").appendChild(li);
                else {
                    completedList.append(li);
                    li.classList.add('checked');
                }

                let span = document.createElement("SPAN");
                let txt = document.createTextNode("\u00D7");
                span.className = "close";
                span.appendChild(txt);
                li.appendChild(span);

                for (let i = 0; i < close.length; i++) {
                    close[i].onclick = function () {
                        const userConfirm = confirm("Bent u zeker?");
                        if (userConfirm == true) {
                            let div = this.parentElement;
                            div.style.display = "none";

                            let taak_id = {};
                            taak_id['taak_id'] = close[i].parentElement.classList.item(0);

                            fetch("https://productivv-backend.herokuapp.com/taken", {
                                method: "DELETE",
                                body: JSON.stringify(taak_id),
                                headers: fetchHeaders
                            }).then(res => res.json()).catch(e => console.log(e));
                        }
                    }
                }

                let span1 = document.createElement("SPAN");
                let txt1 = document.createTextNode("\u2630");
                span1.className = "edit";
                span1.appendChild(txt1);
                li.appendChild(span1);

                for (let i = 0; i < edit.length; i++) {
                    edit[i].onclick = function () {
                        modal.style.display = 'block';
                        headerText.innerHTML = "Taak Bewerken";
                        submitBtn.innerHTML = "Bewerk Taak";
                        console.log('clicked on edit');
                        form.removeAttribute('class');
                        form.classList.add(edit[i].parentElement.classList.item(0)); //id of the task

                        fetch(`https://productivv-backend.herokuapp.com/taken/${ edit[i].parentElement.classList.item(0) }`, {
                            method: 'GET',
                            headers: fetchHeaders
                        }).then(res => {
                            res.json().then(data => {

                                console.log(data);
                                document.getElementById('titel').value = data.titel;
                                document.getElementById('omschrijving').value = data.omschrijving;
                                document.getElementById('opleveringsdatum').value = data.opleverings_datum;
                                document.getElementById('prioriteit').value = data.prioriteit;
                                document.getElementById('categorie').value = data.categorie;

                            }).catch(e => console.log(e));
                        }).catch(e => console.log(e));
                    }
                }

                let span2 = document.createElement("SPAN");
                let txt2 = document.createTextNode("\uD83D\uDCE7");
                span2.className = "share";
                span2.appendChild(txt2);
                li.appendChild(span2);

                for (let i = 0; i < share.length; i++) {
                    share[i].onclick = function () {
                        console.log('Share button clicked');

                        fetch(`https://productivv-backend.herokuapp.com/taken/${ share[i].parentElement.classList.item(0) }`, {
                            method: 'GET',
                            headers: fetchHeaders
                        }).then(res => {
                            res.json().then(data => {

                                console.log(data);
                                let subject = "Mijn taak via PRODUCTIVV!";
                                let body = `Titel: ${data.titel} \n Omschrijving: ${data.omschrijving} \n Opleveringsdatum: ${data.opleverings_datum} \n Prioriteit: ${data.prioriteit} \nCategorie: ${data.categorie}`;
                                location.href = "mailto:someone@domain.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

                            }).catch(e => console.log(e));
                        }).catch(e => console.log(e));
                    }
                }
            }
        }
    }).catch(e => console.log(e));
}).catch(e => console.log(e));


// Create a "close" button and append it to each list item
let myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
    let span1 = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span1.className = "close";
    span1.appendChild(txt);
    myNodelist[i].appendChild(span1);
}

// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    const userConfirm = confirm("Bent u zeker?");
    if (userConfirm == true) {
        let div = this.parentElement;
        div.style.display = "none";

        let taak_id = {};
        taak_id['taak_id'] = close[i].parentElement.classList.item(0);

        fetch("https://productivv-backend.herokuapp.com/taken", {
            method: "DELETE",
            body: JSON.stringify(taak_id),
            headers: fetchHeaders
        }).then(res => res.json()).catch(e => console.log(e));
    }
}

// Create a "edit" button and append it to each list item
for (let i = 0; i < myNodelist.length; i++) {
    let span1 = document.createElement("SPAN");
    let txt = document.createTextNode("edit");
    span1.className = "edit";
    span1.appendChild(txt);
    myNodelist[i].appendChild(span1);
}

// Click on a edit button
let edit = document.getElementsByClassName("edit");
for (let i = 0; i < edit.length; i++) {
    edit[i].onclick = () => {
        modal.style.display = 'block';
        headerText.innerHTML = "Taak Bewerken";
        submitBtn.innerHTML = "Bewerk Taak";
        console.log('clicked on edit');
        console.log(edit[i].parentElement.classList.item(0)); //id of the task
        form.removeAttribute('class');
        form.classList.add(edit[i].parentElement.classList.item(0));

        fetch(`https://productivv-backend.herokuapp.com/taken/${ edit[i].parentElement.classList.item(0) }`, {
            method: 'GET',
            headers: fetchHeaders
        }).then(res => {
            res.json().then(data => {

                console.log(data);
                document.getElementById('titel').value = data.titel;
                document.getElementById('omschrijving').value = data.omschrijving;
                document.getElementById('opleveringsdatum').value = data.opleverings_datum;
                document.getElementById('prioriteit').value = data.prioriteit;
                document.getElementById('categorie').value = data.categorie;

            }).catch(e => console.log(e));
        }).catch(e => console.log(e));
    }
}

// Create a "share" button and append it to each list item
for (let i = 0; i < myNodelist.length; i++) {
    let span1 = document.createElement("SPAN");
    let txt = document.createTextNode("share &#9993;");
    span1.className = "share";
    span1.appendChild(txt);
    myNodelist[i].appendChild(span1);
}

// Click on a share
let share = document.getElementsByClassName("share");
for (let i = 0; i < share.length; i++) {
    console.log('Share button clicked');
}

// Add a "checked" symbol when clicking on a list item
let list = document.getElementById('todolist');
let completedList = document.getElementById('completedlist');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        if (ev.target.classList.contains('checked')) {
            completedList.appendChild(ev.target);

            const updatedTaak = {};
            updatedTaak['compleet'] = 1;
            updatedTaak['taak_id'] = ev.target.classList.item(0);

            fetch('https://productivv-backend.herokuapp.com/taken', {
                method: 'PUT',
                body: JSON.stringify(updatedTaak),
                headers: fetchHeaders
            }).then(res => console.log(res)).catch(e => console.log(e));

        } else {
            list.appendChild(ev.target);

            const updatedTaak = {};
            updatedTaak['compleet'] = 0;
            updatedTaak['taak_id'] = ev.target.classList.item(0);

            fetch('https://productivv-backend.herokuapp.com/taken', {
                method: 'PUT',
                body: JSON.stringify(updatedTaak),
                headers: fetchHeaders
            }).then(res => console.log(res)).catch(e => console.log(e));

        }
    }
}, false);

completedList.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        if (ev.target.classList.contains('checked')) {
            completedList.appendChild(ev.target);

            const updatedTaak = {};
            updatedTaak['compleet'] = 1;
            updatedTaak['taak_id'] = ev.target.classList.item(0);

            fetch('https://productivv-backend.herokuapp.com/taken', {
                method: 'PUT',
                body: JSON.stringify(updatedTaak),
                headers: fetchHeaders
            }).then(res => console.log(res)).catch(e => console.log(e));

        } else {
            list.appendChild(ev.target);

            const updatedTaak = {};
            updatedTaak['compleet'] = 0;
            updatedTaak['taak_id'] = ev.target.classList.item(0);

            fetch('https://productivv-backend.herokuapp.com/taken', {
                method: 'PUT',
                body: JSON.stringify(updatedTaak),
                headers: fetchHeaders
            }).then(res => console.log(res)).catch(e => console.log(e));

        }
    }
}, false);