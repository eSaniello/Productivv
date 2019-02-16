let cijferlijstTabel = new Tabulator("#cijferlijst", {
    layout: "fitColumns",
    addRowPos: "bottom",
    tooltips: true,
    columnMinWidth: 50,
    columns: [{
            title: "Vak",
            field: "vak",
            editor: "input"
        },
        {
            title: "Periode 1",
            field: "periode_1",
            editor: "number"
        },
        {
            title: "Periode 2",
            field: "periode_2",
            editor: "number"
        },
        {
            title: "Periode 3",
            field: "periode_3",
            editor: "number"
        },
        {
            title: "Periode 4",
            field: "periode_4",
            editor: "number"
        }
    ],
    cellEditCancelled: (cell) => {
        console.log(`Cancelled editing cell: ${cell._cell.value}`);
        console.log(cell._cell);
    },
    cellEdited: (cell) => {
        console.log(`Edited cell: ${cell._cell.oldValue} to ${cell._cell.value}`);
        console.log(cell._cell);

        let cijferlijst = {};
        cijferlijst[cell._cell.column.field] = cell._cell.value;
        cijferlijst['cijferlijst_id'] = cell._cell.row.data.cijferlijst_id;

        fetch("https://productivv-backend.herokuapp.com/cijferlijst", {
            method: "PATCH",
            headers: fetchHeaders,
            body: JSON.stringify(cijferlijst)
        }).then(res => res.json()).catch(e => console.log(e));
    }
});

let deleteCijferlijstBtn = document.getElementById('deleteCijferlijstRow');
let cijferlijstTabledata;

fetch("https://productivv-backend.herokuapp.com/cijferlijst", {
    method: 'GET',
    headers: fetchHeaders
}).then(res => {
    res.json().then(data => {
        cijferlijstTabledata = Object.keys(data).map(i => data[i]);
        cijferlijstTabel.setData(cijferlijstTabledata);

        deleteCijferlijstBtn.onclick = () => {
            let cijferlijst = {};
            cijferlijst['cijferlijst_id'] = cijferlijstTabledata[cijferlijstTabledata.length - 1].cijferlijst_id;
            console.log(cijferlijst);

            fetch("https://productivv-backend.herokuapp.com/cijferlijst/deleteOne", {
                method: "DELETE",
                headers: fetchHeaders,
                body: JSON.stringify(cijferlijst)
            }).then(res => {
                cijferlijstTabledata.pop();
                cijferlijstTabel.setData(cijferlijstTabledata);
            }).catch(e => console.log(e));
        }
    }).catch(e => console.log(e));
}).catch(e => console.log(e));

function addCijferlijstRow() {
    let cijferlijst = {};
    cijferlijst['fk_gebruikers_id'] = 1; //Dynamisch achterhalen in final app!

    fetch("https://productivv-backend.herokuapp.com/cijferlijst/create", {
        method: 'POST',
        headers: fetchHeaders,
        body: JSON.stringify(cijferlijst)
    }).then(res => {
        res.json();
        cijferlijstTabel.addRow({});
    }).catch(e => console.log(e));
}