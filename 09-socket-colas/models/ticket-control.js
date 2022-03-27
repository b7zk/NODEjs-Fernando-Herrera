const path = require("path");
const fs = require("fs");
class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}
class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];

    this.init();
  }
  //serializar al guardar
  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4,
    };
  }

  init() {
    const { hoy, tickets, ultimo, ultimos4 } = require("../db/data.json");
    if (hoy === this.hoy) {
      //es el mismo día, hay que retomar
      this.tickets = tickets;
      this.ultimo = ultimo;
      this.ultimos4 = ultimos4;
    } else {
      //es otro día, hay que reinicializar
      this.guardarDB();
    }
  }

  guardarDB() {
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }
  //asignar siguiente ticket
  siguiente() {
    this.ultimo++;
    const ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.guardarDB();
    return "Ticket " + ticket.numero;
  }
  //atender tickets
  atenderTicket(escritorio) {
    //no tenemos tickets
    if (this.tickets.length === 0) {
      return null;
    }

    //borrar del arreglo el ticket
    const ticket = this.tickets.shift();
    ticket.escritorio = escritorio;

    this.ultimos4.unshift(ticket); //unshift añade el inicio

    if (this.ultimos4.length > 4) {
      this.ultimos4.splice(-1, 1); //corta el ultimo
    }

    this.guardarDB();

    return ticket;
  }
}

module.exports = TicketControl;
