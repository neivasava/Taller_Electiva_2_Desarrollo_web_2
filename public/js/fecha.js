const { request } = require("express");

var hoy = new Date();
var fecha= hoy.getDate()+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear();

module.exports.fecha=fecha;