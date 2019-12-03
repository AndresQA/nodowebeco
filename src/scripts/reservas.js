window.onload = () => {

    //selecciona la lista donde van a ir las peticiones
    let usersList = document.querySelector(".reservas-list");
    // cuadro verde de seleccionado
    var current_selection = document.querySelector("#current_selection");


    //la clase de admin almacena todas las reservas devolviendome cual esta seleccionada actualmente
    var admin = new ReservarAdmin();
    admin.setViewSeleccion(current_selection);

    db.readBranchDatabase(Branch.solicitud, (reservas) => {

        var nAudifonos = 50;
        var nTablets = 50;
        var nPortatiles = 50;

        usersList.innerHTML = "";

        admin.reset();
        reservas.forEach(r => {
            var reserva = new Reserva(r);
            if (reserva.estado === "aprobado") {
                switch (reserva.recurso) {
                    case "audifonos":

                        nAudifonos--;
                        break;
                    case "tablets":
                        nTablets--;
                        break;
                    case "portatiles":
                        nPortatiles--;
                        break;
                }
            }

            admin.add(reserva);

            usersList.appendChild(reserva.render());

        });

        db.writeDatabase("recursos/audifonos/cantidad", nAudifonos);
        db.writeDatabase("recursos/tablets/cantidad", nTablets);
        db.writeDatabase("recursos/portatiles/cantidad", nPortatiles);

    })
    /*
    let referenciaAUsuariosEnBD = firebase.database().ref('solicitudes');
    referenciaAUsuariosEnBD.on('child_added', function (data) {
        // ejecutamos la información con los datos adicionados
        console.log("nuevo usuaro detectado: " + data.key);
        addNewUser(data.key, data.val().email, data.val().estado, data.val().fecha, data.val().nombre, data.val().recurso);
    });
    */



    function addNewUser(key, email, estado, fecha, nombre, recurso) {
        let listItem = document.createElement("div");
        listItem.className += "fila";
        /*  listItem.innerHTML =

                "<div>" +
                "" + "<p>" + nombre + "</p>" +
                "</div>" +
                "<div>" +
                "" + "<p>" + email + "</p>" +
                "</div>" +
                "<div>" +
                "" + "<p>" + fecha + "</p>" +
                "</div>" +
                "<div>" +
                "" + "<p>" + recurso + "</p>" +
                "</div>" +
                "<div>" +
                "" + "<p class=\"estado\">" + estado + "</p>" +
                "</div>"
*/


        /*
                listItem.innerHTML = `
                    <div>
                        <p> ${nombre} </p>
                    </div>
                    <div>
                        <p> ${email} </p>
                    </div>
                    <div>
                        <p> ${fecha} </p>
                    </div>
                    <div>
                        <p> ${recurso} </p>
                    </div>
                    <div>
                        <p class="estado ${estado}"> ${chooseTextState(estado)} </p>
                    </div>
                    `


                usersList.appendChild(listItem);
        */

    }






}