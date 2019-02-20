let myModal_deadline = document.getElementById('myModal_deadline');

let headerText_deadline = document.getElementById('headertext_deadline');
let submitBtn_deadline = document.getElementById('submitBtn_deadline');

let btn_deadline = document.getElementById("myBtn_deadline");

let span_deadline = document.getElementsByClassName("closeModal")[1];

btn_deadline.onclick = () => {
    headerText_deadline.innerHTML = "Nieuwe Taak";
    myModal_deadline.style.display = "block";
    submitBtn_deadline.innerHTML = "Creeer Taak";
    document.getElementById('titel_deadline').value = null;
    document.getElementById('omschrijving_deadline').value = null;
    document.getElementById('opleveringsdatum_deadline').value = null;
}

span_deadline.onclick = () => {
    myModal_deadline.style.display = "none";
}

//wanneer de gebruiker ergens op de background klikt sluit het venster
// window.onclick = (event) => {
//     if (event.target == myModal_deadline) {
//          myModal_deadline.style.display = "none";
//     }
// }

//backend api call
const form_deadline = document.getElementById('form_deadline');

form_deadline.addEventListener('submit', (event) => {
    if (submitBtn_deadline.innerHTML === "Creeer Taak") {
        const taak = {};

        taak['titel'] = document.getElementById('titel_deadline').value;
        taak['omschrijving'] = document.getElementById('omschrijving_deadline').value;
        taak['opleverings_datum'] = document.getElementById('opleveringsdatum_deadline').value;
        //dynamisch achterhalen in full app.
        taak['fk_gebruikers_id'] = localStorage.getItem("gebruikers_id");

        console.log(taak);

        fetch('https://productivv-backend.herokuapp.com/taken/create', {
            method: 'POST',
            body: JSON.stringify(taak),
            headers: fetchHeaders
        }).then(res => {
            console.log(res);
            myModal_deadline.style.display = "none";
            //reload the page to load new entries in database
            location.reload();
        }).catch(e => console.log(e));
    } else {
        const taak = {};

        taak['titel'] = document.getElementById('titel_deadline').value;
        taak['omschrijving'] = document.getElementById('omschrijving_deadline').value;
        taak['opleverings_datum'] = document.getElementById('opleveringsdatum_deadline').value;
        taak['taak_id'] = form_deadline.classList.value;

        console.log(taak);

        fetch('https://productivv-backend.herokuapp.com/taken', {
            method: 'PUT',
            body: JSON.stringify(taak),
            headers: fetchHeaders
        }).then(res => {
            console.log(res);
            myModal_deadline.style.display = "none";
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

            if (data.takens[j].categorie == null && data.takens[j].prioriteit == null) {

                // Create a new list_deadline item when clicking on the "Add" button
                let li = document.createElement("li");
                let t = document.createTextNode(data.takens[j].titel);
                li.appendChild(t);
                li.classList.add(data.takens[j].taak_id);


                let completedList_deadline = document.getElementById('completedlist_deadline');

                if (data.takens[j].compleet == false)
                    document.getElementById("todolist_deadline").appendChild(li);
                else {
                    completedList_deadline.append(li);
                    li.classList.add('checked');
                }

                let span = document.createElement("SPAN");
                let txt = document.createTextNode("\u00D7");
                span.className = "close";
                span.appendChild(txt);
                li.appendChild(span);

                for (let i = 0; i < close_deadline.length; i++) {
                    close_deadline[i].onclick = function () {
                        const userConfirm = confirm("Bent u zeker?");
                        if (userConfirm == true) {
                            let div = this.parentElement;
                            div.style.display = "none";

                            let taak_id = {};
                            taak_id['taak_id'] = close_deadline[i].parentElement.classList.item(0);

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
                span1.className = "edit_deadline";
                span1.appendChild(txt1);
                li.appendChild(span1);

                for (let i = 0; i < edit_deadline.length; i++) {
                    edit_deadline[i].onclick = function () {
                        myModal_deadline.style.display = 'block';
                        headerText_deadline.innerHTML = "Taak Bewerken";
                        submitBtn_deadline.innerHTML = "Bewerk Taak";
                        console.log('clicked on edit');
                        form_deadline.removeAttribute('class');
                        form_deadline.classList.add(edit_deadline[i].parentElement.classList.item(0)); //id of the task

                        fetch(`https://productivv-backend.herokuapp.com/taken/${ edit_deadline[i].parentElement.classList.item(0) }`, {
                            method: 'GET',
                            headers: fetchHeaders
                        }).then(res => {
                            res.json().then(data => {

                                console.log(data);
                                document.getElementById('titel_deadline').value = data.titel;
                                document.getElementById('omschrijving_deadline').value = data.omschrijving;
                                document.getElementById('opleveringsdatum_deadline').value = data.opleverings_datum;

                            }).catch(e => console.log(e));
                        }).catch(e => console.log(e));
                    }
                }

                let span2 = document.createElement("SPAN");
                let txt2 = document.createTextNode("\uD83D\uDCE7");
                span2.className = "share_deadline";
                span2.appendChild(txt2);
                li.appendChild(span2);

                for (let i = 0; i < share_deadline.length; i++) {
                    share_deadline[i].onclick = function () {
                        console.log('Share button clicked');

                        fetch(`https://productivv-backend.herokuapp.com/taken/${ share_deadline[i].parentElement.classList.item(0) }`, {
                            method: 'GET',
                            headers: fetchHeaders
                        }).then(res => {
                            res.json().then(data => {

                                console.log(data);
                                let subject = "Mijn taak via PRODUCTIVV!";
                                let body = `Titel: ${data.titel} \n Omschrijving: ${data.omschrijving} \n Opleveringsdatum: ${data.opleverings_datum}`;
                                location.href = "mailto:someone@domain.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

                            }).catch(e => console.log(e));
                        }).catch(e => console.log(e));
                    }
                }
            }
        }
    }).catch(e => console.log(e));
}).catch(e => console.log(e));


// Create a "close_deadline" button and append it to each list_deadline item
let myNodelist_deadline = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist_deadline.length; i++) {
    let span1 = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span1.className = "close";
    span1.appendChild(txt);
    myNodelist_deadline[i].appendChild(span1);
}

// Click on a close_deadline button to hide the current list_deadline item
let close_deadline = document.getElementsByClassName("close");
for (let i = 0; i < close_deadline.length; i++) {
    const userConfirm = confirm("Bent u zeker?");
    if (userConfirm == true) {
        let div = this.parentElement;
        div.style.display = "none";

        let taak_id = {};
        taak_id['taak_id'] = close_deadline[i].parentElement.classList.item(0);

        fetch("https://productivv-backend.herokuapp.com/taken", {
            method: "DELETE",
            body: JSON.stringify(taak_id),
            headers: fetchHeaders
        }).then(res => res.json()).catch(e => console.log(e));
    }
}

// Create an "edit_deadline" button and append it to each list_deadline item
for (let i = 0; i < myNodelist_deadline.length; i++) {
    let span1 = document.createElement("SPAN");
    let txt = document.createTextNode("edit");
    span1.className = "edit_deadline";
    span1.appendChild(txt);
    myNodelist_deadline[i].appendChild(span1);
}

// Click on a edit_deadline button
let edit_deadline = document.getElementsByClassName("edit_deadline");
for (let i = 0; i < edit_deadline.length; i++) {
    edit_deadline[i].onclick = () => {
        myModal_deadline.style.display = 'block';
        headerText_deadline.innerHTML = "Taak Bewerken";
        submitBtn_deadline.innerHTML = "Bewerk Taak";
        console.log('clicked on edit');
        console.log(edit_deadline[i].parentElement.classList.item(0)); //id of the task
        form_deadline.removeAttribute('class');
        form_deadline.classList.add(edit_deadline[i].parentElement.classList.item(0));

        fetch(`https://productivv-backend.herokuapp.com/taken/${ edit_deadline[i].parentElement.classList.item(0) }`, {
            method: 'GET',
            headers: fetchHeaders
        }).then(res => {
            res.json().then(data => {

                console.log(data);
                document.getElementById('titel_deadline').value = data.titel;
                document.getElementById('omschrijving_deadline').value = data.omschrijving;
                document.getElementById('opleveringsdatum_deadline').value = data.opleverings_datum;

            }).catch(e => console.log(e));
        }).catch(e => console.log(e));
    }
}

// Create a "share_deadline" button and append it to each list_deadline item
for (let i = 0; i < myNodelist_deadline.length; i++) {
    let span1 = document.createElement("SPAN");
    let txt = document.createTextNode("share &#9993;");
    span1.className = "share_deadline";
    span1.appendChild(txt);
    myNodelist_deadline[i].appendChild(span1);
}

// Click on a share_deadline
let share_deadline = document.getElementsByClassName("share_deadline");
for (let i = 0; i < share_deadline.length; i++) {
    console.log('Share button clicked');
}

// Add a "checked" symbol when clicking on a list_deadline item
let list_deadline = document.getElementById('todolist_deadline');
let completedList_deadline = document.getElementById('completedlist_deadline');
list_deadline.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        if (ev.target.classList.contains('checked')) {
            completedList_deadline.appendChild(ev.target);

            const updatedTaak = {};
            updatedTaak['compleet'] = 1;
            updatedTaak['taak_id'] = ev.target.classList.item(0);

            fetch('https://productivv-backend.herokuapp.com/taken', {
                method: 'PUT',
                body: JSON.stringify(updatedTaak),
                headers: fetchHeaders
            }).then(res => console.log(res)).catch(e => console.log(e));

        } else {
            list_deadline.appendChild(ev.target);

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

completedList_deadline.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        if (ev.target.classList.contains('checked')) {
            completedList_deadline.appendChild(ev.target);

            const updatedTaak = {};
            updatedTaak['compleet'] = 1;
            updatedTaak['taak_id'] = ev.target.classList.item(0);

            fetch('https://productivv-backend.herokuapp.com/taken', {
                method: 'PUT',
                body: JSON.stringify(updatedTaak),
                headers: fetchHeaders
            }).then(res => console.log(res)).catch(e => console.log(e));

        } else {
            list_deadline.appendChild(ev.target);

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