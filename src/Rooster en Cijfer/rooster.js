let roosterTabel = new Tabulator("#rooster", {
    layout: "fitColumns",
    addRowPos: "bottom",
    tooltips: true,
    columnMinWidth: 50,
    selectable: true,
    columns: [{
            title: "X",
            field: "x"
        }, {
            title: "Blok",
            field: "blok",
            editor: "number"
        },
        {
            title: "Tijd",
            field: "tijd",
            editor: "input"
        },
        {
            title: "Maandag",
            field: "maandag",
            editor: "input"
        },
        {
            title: "Dinsdag",
            field: "dinsdag",
            editor: "input"
        },
        {
            title: "Woensdag",
            field: "woensdag",
            editor: "input"
        },
        {
            title: "Donderdag",
            field: "donderdag",
            editor: "input"
        },
        {
            title: "Vrijdag",
            field: "vrijdag",
            editor: "input"
        },
        {
            title: "Zaterdag",
            field: "zaterdag",
            editor: "input"
        }
    ],
    cellEditCancelled: (cell) => {
        console.log(`Cancelled editing cell: ${cell._cell.value}`);
        console.log(cell._cell);
    },
    cellEdited: (cell) => {
        console.log(`Edited cell: ${cell._cell.oldValue} to ${cell._cell.value}`);
        console.log(cell._cell);

        let rooster = {};
        rooster[cell._cell.column.field] = cell._cell.value;
        rooster['rooster_id'] = cell._cell.row.data.rooster_id;

        fetch("https://productivv-backend.herokuapp.com/rooster", {
            method: "PUT",
            headers: fetchHeaders,
            body: JSON.stringify(rooster)
        }).then(res => res.json()).catch(e => console.log(e));
    }
});

let deleteRoosterBtn = document.getElementById('deleteRoosterRow');
let roosterTabledata;

fetch(`https://productivv-backend.herokuapp.com/gebruikers/${ localStorage.getItem("gebruikers_naam") }`, {
    method: 'GET',
    headers: fetchHeaders
}).then(res => {
    res.json().then(data => {
        roosterTabledata = Object.keys(data.roosters).map(i => data.roosters[i]);
        roosterTabel.setData(roosterTabledata);

        deleteRoosterBtn.onclick = () => {
            if (roosterTabel.getSelectedData().length > 0) {
                for (let i = 0; i < roosterTabel.getSelectedData().length; i++) {
                    let rooster = {};
                    rooster['rooster_id'] = roosterTabel.getSelectedData()[i].rooster_id;

                    fetch("https://productivv-backend.herokuapp.com/rooster/deleteOne", {
                        method: "DELETE",
                        headers: fetchHeaders,
                        body: JSON.stringify(rooster)
                    }).then(res => {
                        roosterTabledata.pop();
                        roosterTabel.setData(roosterTabledata);
                    }).catch(e => console.log(e));
                }
            } else {
                let rooster = {};
                rooster['rooster_id'] = roosterTabledata[roosterTabledata.length - 1].rooster_id;

                fetch("https://productivv-backend.herokuapp.com/rooster/deleteOne", {
                    method: "DELETE",
                    headers: fetchHeaders,
                    body: JSON.stringify(rooster)
                }).then(res => {
                    roosterTabledata.pop();
                    roosterTabel.setData(roosterTabledata);
                }).catch(e => console.log(e));
            }
        }
    }).catch(e => console.log(e));
}).catch(e => console.log(e));

function addRoosterRow() {
    let rooster = {};
    rooster['fk_gebruikers_id'] = localStorage.getItem("gebruikers_id"); //Dynamisch achterhalen in final app!

    fetch("https://productivv-backend.herokuapp.com/rooster/create", {
        method: 'POST',
        headers: fetchHeaders,
        body: JSON.stringify(rooster)
    }).then(res => {
        res.json();
        roosterTabel.addRow({});
    }).catch(e => console.log(e));
}