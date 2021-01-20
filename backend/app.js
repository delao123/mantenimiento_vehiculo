const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); 
const User = require("./models/User");
const Vehiculo = require("./models/Vehiculo");
const Refaccion = require("./models/Refaccion");
const Trabajador = require("./models/Trabajador")
const getToken = require("./utils").getToken;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "hbs");
app.use(express.static(__dirname + '/public'));

const mongodbUrl = "mongodb://localhost/gestor_autos";
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

app.get("/home", (req,res) =>{
    res.render("home");
});

app.get("/vehiculos", async (req, res) => {
    const vehiculos = await Vehiculo.find({});
    res.send(vehiculos);
});

app.get("/login", (req, res) =>{
    res.render("login");
});
app.post("/login", async (req,res) =>{
    console.log(req.body);
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password 
    });
    if(signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send( {msg:"Invalid Email or Password"});
    }
});

app.post('/vehiculos', async (req, res) => {
    const vehiculo = new Vehiculo({
        inventario: req.body.inventario,
        vehiculo: req.body.vehiculo,
        descripcion: req.body.descripcion,
        chofer: req.body.chofer,
        fechaSalida: req.body.fechaSalida,
        fechaLlegada: req.body.fechaLlegada,
        observaciones: req.body.observaciones
    });
    const newUser = await vehiculo.save();
    if(newUser){
        res.send({
        id: newUser._id,
        inventario: newUser.inventario,
        vehiculo: newUser.vehiculo,
        descripcion: newUser.descripcion,
        chofer: newUser.chofer,
        fechaSalida: newUser.fechaSalida,
        fechaLlegada: newUser.fechaLlegada,
        observaciones: newUser.observaciones
        });
    } else {
        res.status(401).send( {msg:"Invalid User Data"} );
    }
});

app.put('/vehiculos/:id', async (req, res) => {
    const vehiculoId = req.params.id;
    const vehiculo = await Vehiculo.findById(vehiculoId);
    if (vehiculo) {
        vehiculo.inventario = req.body.inventario;
        vehiculo.vehiculo = req.body.vehiculo;
        vehiculo.descripcion = req.body.descripcion;
        vehiculo.chofer = req.body.chofer;
        vehiculo.fechaSalida = req.body.fechaSalida;
        vehiculo.fechaLlegada = req.body.fechaLlegada;
        vehiculo.observaciones = req.body.observaciones;
      const updatedVehiculo = await vehiculo.save();
      if (updatedVehiculo) {
        return res
          .status(200)
          .send({ message: 'Product Updated', data: updatedVehiculo });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
  });

  app.delete('/vehiculos/:id', async (req, res) => {
    const deletedVehiculo = await Vehiculo.findById(req.params.id);
    if (deletedVehiculo) {
      await deletedVehiculo.remove();
      res.send({ message: 'Vechiculo Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
  });

  app.get("/refacciones", async (req, res) => {
    const refacciones = await Refaccion.find({});
    res.send(refacciones);
});

  app.post('/refacciones', async (req, res) => {
    const refaccion = new Refaccion({
        tipo: req.body.tipo,
        cantidad: req.body.cantidad,
        marca: req.body.marca,
        descripcion: req.body.descripcion,
        disponiblesTaller: req.body.disponiblesTaller,
        disponiblesAlmacen: req.body.disponiblesAlmacen,
        imagen: req.body.imagen,
        precioUnitario: req.body.precioUnitario
    });
    const newTrabajador = await refaccion.save();
    if(newTrabajador){
        res.send({
        id: newTrabajador._id,
        tipo: newTrabajador.tipo,
        cantidad: newTrabajador.cantidad,
        marca: newTrabajador.marca,
        descripcion: newTrabajador.descripcion,
        disponiblesTaller: newTrabajador.disponiblesTaller,
        disponiblesAlmacen: newTrabajador.disponiblesAlmacen,
        imagen: newTrabajador.imagen,
        precioUnitario: newTrabajador.precioUnitario
        });
    } else {
        res.status(401).send( {msg:"Invalid User Data"} );
    }
});

app.put('/refacciones/:id', async (req, res) => {
    const refaccionId = req.params.id;
    const refaccion = await Refaccion.findById(refaccionId);
    if (refaccion) {
        refaccion.tipo = req.body.tipo;
        refaccion.cantidad = req.body.cantidad;
        refaccion.marca = req.body.marca;
        refaccion.descripcion = req.body.descripcion;
        refaccion.disponiblesTaller = req.body.disponiblesTaller;
        refaccion.disponiblesAlmacen = req.body.disponiblesAlmacen;
        refaccion.imagen = req.body.imagen;
        refaccion.precioUnitario = req.body.precioUnitario;
      const updatedRefaccion = await refaccion.save();
      if (updatedRefaccion) {
        return res
          .status(200)
          .send({ message: 'Product Updated', data: updatedRefaccion });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
  });

  app.delete('/refacciones/:id', async (req, res) => {
    const deletedRefaccion = await Refaccion.findById(req.params.id);
    if (deletedRefaccion) {
      await deletedRefaccion.remove();
      res.send({ message: 'Refaccion Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
  });

  app.post('/trabajadores', async (req, res) => {
    const trabajador = new Trabajador({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        cargo: req.body.cargo,
        horaEntrada: req.body.horaEntrada,
        horaSalida: req.body.horaSalida,
        operacion: req.body.operacion,
        fecha: req.body.fecha
    });
    const newTrabajador = await trabajador.save();
    if(newTrabajador){
        res.send({
        id: newTrabajador._id,
        nombres: newTrabajador.nombres,
        apellidos: newTrabajador.apellidos,
        cargo: newTrabajador.cargo,
        horaEntrada: newTrabajador.horaEntrada,
        horaSalida: newTrabajador.horaSalida,
        operacion: newTrabajador.operacion,
        fecha: newTrabajador.fecha
        });
    } else {
        res.status(401).send( {msg:"Invalid User Data"} );
    }
});

app.get("/trabajadores", async (req, res) => {
    const trabajadores = await Trabajador.find({});
    res.send(trabajadores);
});

app.put('/trabajadores/:id', async (req, res) => {
    const trabajadorId = req.params.id;
    const trabajador = await Trabajador.findById(trabajadorId);
    if (trabajador) {
        trabajador.nombres = req.body.nombres;
        trabajador.apellidos = req.body.apellidos;
        trabajador.cargo = req.body.cargo;
        trabajador.horaEntrada = req.body.horaEntrada;
        trabajador.horaSalida = req.body.horaSalida;
        trabajador.operacion = req.body.operacion;
        trabajador.fecha = req.body.fecha;
      const updatedTrabajador = await trabajador.save();
      if (updatedTrabajador) {
        return res
          .status(200)
          .send({ message: 'Product Updated', data: updatedTrabajador });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
  });

  app.delete('/trabajadores/:id', async (req, res) => {
    const deletedTrabajador = await Trabajador.findById(req.params.id);
    if (deletedTrabajador) {
      await deletedTrabajador.remove();
      res.send({ message: 'Registro Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
  });

app.listen(5050, () => {
    console.log("Server up on port 5050");
});