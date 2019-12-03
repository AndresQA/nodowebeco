class ReservarAdmin {
    constructor() {
        this.reservas = [];
        this.currentReserva = undefined; //reserva que esta seleccionada (interna)
        this.viewSeleccion = undefined; //lo mismo pero visual el "verde"
    }

    updateCurrentReserva() {
        //recorre todas las reservas almacenadas
        this.reservas.forEach(reserva => {
            //revisa cual UID es la misma que la que esta seleccionada y la actualiza
            if (reserva.UID === this.currentReserva.UID) {
                this.setCurrentReserva(reserva)
                return;
            }
        })
    }

    setViewSeleccion(viewSeleccion) {
        this.viewSeleccion = viewSeleccion;
    }

    setCurrentReserva(reserva) {
        //remueve la clase seleccion a todas las reservas por que de lo contrario todas a las que se le oprima quedaran seleccionadas
        this.reservas.forEach(reserva => {
        reserva.view.classList.remove("seleccion");
        });
        //este agrega la clase seleccion unicamente a la reserva seleccionada
        reserva.view.classList.add("seleccion");
        this.currentReserva = reserva;
        this.viewSeleccion.innerHTML = "";
        this.viewSeleccion.appendChild(this.currentReserva.renderViewPeticion());
    }

    add(reserva) {
        //pasa el observador de admin
        reserva.getObserver(this);
        this.reservas.push(reserva);
    }

    reset() {
        this.reservas = [];
    }
}

class Reserva {
    constructor(reserva) {
        //si hay una reserva me la devuelce, de lo contrario me devuelve un vacio ""
        this.admin = reserva ? reserva.admin : undefined;

        this.UID = reserva ? reserva.UID : "";
        this.email = reserva ? reserva.email : "";
        this.estado = reserva ? reserva.estado : "";
        this.fecha = reserva ? reserva.fecha : "";
        this.nombre = reserva ? reserva.nombre : "";
        this.recurso = reserva ? reserva.recurso : "";
        this.view = undefined;
        this.viewSeleccion = undefined;
    }

    getObserver(admin) {
        //para llamar al padre de admin y trabajarlo desde la misma reserva.js
        this.admin = admin;
    }

    chooseTextState() {
        var text = "";
        switch (this.estado) {
            case "aprobado":
                text = "Aprobado"
                break;
            case "rechazado":
                text = "Rechazado"
                break;
            case "pendiente":
                text = "Pendiente"
                break;
        }
        return text;
    }

    chooseTextStateProd() {
        var textp = "";
        switch (this.recurso) {
            case "audifonos":
                textp = "Audifonos"
                break;
            case "portatiles":
                textp = "Macbook"
                break;
            case "tablets":
                textp = "Tablet"
                break;
        }
        return textp;
    }
    //Render de listado
    render() {
        this.view = document.createElement("div");
        this.view.className += "fila";
        this.view.innerHTML = `
            <div>
                <p> ${this.nombre} </p>
            </div>
            <div>
                <p> ${this.email} </p>
            </div>
            <div>
                <p> ${this.fecha} </p>
            </div>
            <div>
                <p> ${this.chooseTextStateProd()} </p>
            </div>
            <div>
                <p class="estado ${this.estado}"> ${this.chooseTextState()} </p>
            </div>
            `;


        this.view.addEventListener("click", () => {
            this.admin.setCurrentReserva(this);
        });

        return this.view;
    }

    //Render de peticion
    renderViewPeticion() {
        this.viewSeleccion = document.createElement("div");
        this.viewSeleccion.className += "despachoview";

        const render = () => {
            return `
            <div>
                <p> ${this.nombre} </p>
            </div>
            <div>
                <p> ${this.email} </p>
            </div>
            <div>
                <p> ${this.fecha} </p>
            </div>
            <div>
                <p> ${this.recurso} </p>
            </div>
            <div>
                <p class="estado ${this.estado}"> ${this.chooseTextState()} </p>
            </div>
            <div>
                <button id="aceptar">Aceptar</button>
                <button id="negar">Negar</button>
            </div>`;
        }

        this.viewSeleccion.innerHTML = render();

        var viewAceptar = this.viewSeleccion.querySelector("#aceptar");
        var viewNegar = this.viewSeleccion.querySelector("#negar");

        viewAceptar.addEventListener("click", () => {
            this.estado = "aprobado";
            //db la declare en firebase.js
            db.writeDatabase(Branch.solicitud + "/" + this.UID + "/estado", this.estado);
           // var newcant =
           // db.writeDatabase("/recursos" + "/" + this.recurso + "/cantidad", this.estado);
           
            this.viewSeleccion.innerHTML = render();
            this.admin.updateCurrentReserva();
        })
        viewNegar.addEventListener("click", () => {
            this.estado = "rechazado";
            db.writeDatabase(Branch.solicitud + "/" + this.UID + "/estado", this.estado);
            this.viewSeleccion.innerHTML = render();
            this.admin.updateCurrentReserva();
        })

        return this.viewSeleccion;
    }


}