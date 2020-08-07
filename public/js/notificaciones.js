const socket = io();


function addcount() {
    let contador = document.getElementById('counter');

    let number;
    if (contador.innerHTML == '') {
        number = 1;
    } else {
        number = parseInt(contador.innerHTML.toString()) + 1
    }
    if (json[counter].alert === "robo") {
        let modal = document.querySelector('#buttonexampleModalCenter');
        modal.insertAdjacentHTML("afterend", addNotification(json, counter)[1]);
        modal.click();

    }
    document.querySelector('#alertPrincipal').insertAdjacentHTML('afterend', addNotification(json, counter)[0]);
    contador.innerHTML = number;


    if (window.location == 'https://onny-bus.herokuapp.com/alertas') {
        let container = document.querySelector('#container-alert');
        container.insertAdjacentHTML('afterbegin', addAlert(json, ));
    }
    counter++;
    audio.play();


}

function addAlert(json) {
    let alert = `
    <div class="col-ms-6 col-md-6 col-lg-6">
        <div class="alert alert-warning" role="alert" style="background-color: ${json.alert == 'retraso' ? '#ffe79b':''}${json.alert == 'robo' ? '#ffa6ae':''} ; border-color: ${json.alert == 'retraso' ? '#ffe79b':''};">
            <strong>Bus: ${json.bus} <br>TIPO: ${json.alert} <br>FECHA: ${json.fecha} <br>HORA: ${json.hora}</strong>
        </div>
    </div>
    `
    return alert;
}

function addNotification(json) {
    let alert = `
    <a class="dropdown-item d-flex align-items-center alert-js" href="#" >
    <div class="mr-3">

            <i class="fas fa-exclamation-triangle" style="font-size: 15px"></i>

    </div>
    <div>
        <div class="small text-gray-500 date-js">${json.fecha}</div>
        <span class="font-weight-bold body-js">${json.message +' - '+json.bus} </span>
    </div>
</a>`
    return alert;

}

function addNotificacionRobo(json) {
    let alert = `
    <a class="dropdown-item d-flex align-items-center alert-js" href="#" >
    <div class="mr-3">

            <i class="fas fa-exclamation-triangle" style="font-size: 15px"></i>

    </div>
    <div>
        <div class="small text-gray-500 date-js">${json.fecha}</div>
        <span class="font-weight-bold body-js"> estan robando - ${json.bus} </span>
    </div>
</a>`
    return alert;

}

function ModalAddNotificationRobo(json) {
    let notificaicon = `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Robo vehiculo ${json.bus}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    estan robando el bus ${json.bus}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">cerrar</button>
                    <a href="./mapRobo.html"><button type="button" class="btn btn-primary">ver ubicacion</button></a>
                </div>
            </div>
        </div>
    </div>`;
    return notificaicon;
}


socket.on('notificacion-robo', (data) => {
    let audio = document.getElementById('audio');
    let contador = document.getElementById('counter');
    let modal = document.querySelector('#buttonexampleModalCenter');
    let containerNotificacion = document.querySelector('#alertPrincipal');
    let number;
    if (contador.innerHTML == '') {
        number = 1;
    } else {
        number = parseInt(contador.innerHTML.toString()) + 1;
    }
    contador.innerHTML = number;
    containerNotificacion.insertAdjacentHTML('afterend', addNotificacionRobo(data));

    if (window.location == 'https://onny-bus.herokuapp.com/alertas') {
        let containerAlert = document.querySelector('#container-alert');
        containerAlert.insertAdjacentHTML('afterbegin', addAlert(data));
    }
    audio.play();
    modal.insertAdjacentHTML("afterend", ModalAddNotificationRobo(data));
    modal.click();

});


socket.on('notificacion-retrazo', (data) => {

    let contador = document.getElementById('counter');
    let container = document.querySelector('#alertPrincipal');
    // contador.innerHTML = number;

    if (contador.innerHTML == '') {
        number = 1;
    } else {
        number = parseInt(contador.innerHTML.toString()) + 1
    }

    container.insertAdjacentHTML('afterend', addNotification(data));
    contador.innerHTML = number;


    if (window.location == 'https://onny-bus.herokuapp.com/alertas') {
        let container = document.querySelector('#container-alert');
        container.insertAdjacentHTML('afterbegin', addAlert(data));
    }
    audio.play();
});

let alertButtom = document.querySelector("#alertsDropdown")
alertButtom.addEventListener("click", () => {
    document.getElementById('counter').innerHTML = '';
})