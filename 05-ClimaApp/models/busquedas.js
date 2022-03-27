const fs = require("fs");
const axios = require("axios");

class Busquedas {
  historial = [];
  dbPath = "./db/database.json";

  constructor() {
    //leer db si existe
    this.leerDB();
  }

  get historialCapitalizado() {
    return this.historial.map((l) => {
      let palabras = l.split(" ");
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));
      return palabras.join(" ");
    });
  }
  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }
  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }
  async ciudad(lugar = "") {
    try {
      //---------------------------peticion http

      //token destructurado [CHECAR Funcion get paramsMapbox]
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox, //referencia a la funcion paramsMapbox que contiene los parametros
      });
      //peticion http basada en el token
      const resp = await intance.get();

      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        longitud: lugar.center[0],
        latitud: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
    /* console.log("ciudad", lugar); */

    //retornar los lugares que considan
  }

  async climaxLugar(lat, lon) {
    try {
      //crear intance axious.create()
      const intance = axios.create({
        baseURL: `http://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon },

        //referencia a la funcion paramsWeather que contiene los parametros
      });
      //respuesta.data
      const resp = await intance.get();
      const { weather, main } = resp.data;
      //returnar descripcion: nubes..., min:, max: y temperatura.
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      return [];
    }
  }

  printAll() {
    console.log(this.historial);
  }

  agregarHistorial(lugar = "") {
    //prevenir duplicados

    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }
    //agregar al historial
    this.historial.unshift(lugar.toLocaleLowerCase());

    //grabar en db
    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historial,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }
  leerDB() {
    //debe existir
    if (!fs.existsSync(this.dbPath)) {
      return null;
    }

    //si existe
    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const data = JSON.parse(info);

    console.log("data a cargar: ");
    data.historial.forEach((h) => {
      this.historial.push(h);
    });

    /*

    //segunda tarea, crear un nuevo getter
    //getHistorialCap */
  }
}

module.exports = Busquedas;
