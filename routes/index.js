const express= require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser =require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const INSTRUMENTOS = require('../resources/files/instrument');

let rawdata = fs.readFileSync('listapersonas.json');

let personas = [JSON.parse(rawdata)];

router.get('/',(req,res)=>{
    console.log(personas);
    res.render("index",{personas,title:"Página de Inicio"});
});

router.get('/insert',(req, res)=>{
    res.render('insert',{title:"Prestamos Instrumentos",
        instrumentos:INSTRUMENTOS.instrumentos,
        categorias:INSTRUMENTOS.categoria
    });
});

router.get('/busqueda',(req, res)=>{
    let resultadopersona = [];
    res.render('busqueda',{
        title:"Prestamos Instrumentos",
        resultadopersona
    });
});

router.get('/busqueda/:id',(req, res)=>{
    let cedula = req.params.id;
    let resultadopersona = [];
    resultadopersona.push(personas.find(person=>person.code == cedula));
    resultadopersona
    console.log(resultadopersona);
    res.render('busqueda',{
        title:"Prestamos Instrumentos",
        resultadopersona
    });
});

router.post('/busqueda',urlencodedParser, (req, res)=>{
    const cedula = req.body.cedula;
    res.redirect('/busqueda/'+cedula);
});

router.get('/busqueda/:id/:fecha',(req, res)=>{
    let fecha = req.params.fechaHora;
    let resultadofecha = [];
    resultadofecha.push(personas.find(person=>person.fechaHora));
    resultadofecha
    console.log(resultadofecha);
    res.render('busqueda',{
        title:"Prestamos Instrumentos",
        resultadofecha
    });
});

router.post('/busqueda',urlencodedParser, (req, res)=>{
    const fecha = req.body.fechaHora;
    console.log(fecha);
    res.redirect('/busqueda/'+cedula+'/'+fecha);
});





router.post('/insert',(req,res)=>{
    const{code, name, lastName, gender, cate, inst, email, phone } = req.body;
    const produAux = INSTRUMENTOS.categoria.find( record => record.code == cate ).name;
    const tipoAux = INSTRUMENTOS.instrumentos.find( record => record.code == inst ).name;
    const precio_producto= INSTRUMENTOS.instrumentos.find( record => record.code== inst ).Valor;
    precio=parseInt(precio_producto,10);
    const total=precio;
    const city = tipoAux.concat( '-', produAux );
    const genAux = gender == 'F' ? "Femenino" : "Masculino";
    var hoy = new Date();
    var fecha= hoy.getDate()+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear();
    var hora= hoy.getHours()+':'+hoy.getMinutes();
    var fechaHora= fecha+' '+hora;

    
    let newReg = {code, lastName, name, genAux, city, email, phone, fechaHora  };
    
    personas.push(newReg);
    let newRegJson = JSON.stringify(newReg);
    fs.writeFile("listapersonas.json",newRegJson,function(err,result){
        if(err) console.log('error',err);
    })
    res.redirect('/');
});

router.get('/about',(req,res)=>{
   res.render('about',{title:"Sobre Nosotros"});
});

module.exports = router;
