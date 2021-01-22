import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const url="/vehiculos";
  
class Vehiculo extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    _id:'',
    inventario: '',
    vehiculo: '',
    chofer: '',
    descripcion: '',
    fechaSalida: '',
    fechaLlegada: '',
    observaciones: '',
    tipoModal: ''
  }
}

peticionGet=()=>{
axios.get(url).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
  delete this.state.form.id;
 await axios.post(url,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut=()=>{
  axios.put(url + "/" + this.state.form.id, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}

peticionDelete=()=>{
  axios.delete(url+ "/" + this.state.form.id).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarvehiculo=(vehiculo)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
        id: vehiculo._id,
        inventario: vehiculo.inventario,
        vehiculo: vehiculo.vehiculo,
        descripcion: vehiculo.descripcion,
        chofer: vehiculo.chofer,
        fechaSalida: vehiculo.fechaSalida,
        fechaLlegada: vehiculo.fechaLlegada,
        observaciones: vehiculo.observaciones
    }
  })
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
console.log(this.state.form);
}

  componentDidMount() {
    this.peticionGet();
  }
  

  render(){
    const {form}=this.state;
  return (
    <div className="App">
      <h1>Disponibilidad de Vehículos</h1>
      <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar vehiculo</button>
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th>Número Inventario</th>
          <th>Tipo de Vechículo</th>
          <th>Descripción</th>
          <th>Chofer Responsable</th>
          <th>Fecha de Salida</th>
          <th>Fecha de Llegada</th>
          <th>Observaciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(vehiculo=>{
          return(
            <tr>
          <td>{vehiculo.inventario}</td>
          <td>{vehiculo.vehiculo}</td>
          <td>{vehiculo.descripcion}</td>
          <td>{vehiculo.chofer}</td>
          <td>{vehiculo.fechaSalida}</td>
          <td>{vehiculo.fechaLlegada}</td>
          <td>{vehiculo.observaciones}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarvehiculo(vehiculo); this.modalInsertar()}}><EditIcon/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarvehiculo(vehiculo); this.setState({modalEliminar: true})}}><DeleteIcon /></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  Agregar Vehículo
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                  <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: ''}/>
                    <br />
                    <label htmlFor="inventario">Numero Inventario</label>
                    <input className="form-control" type="text" name="inventario" id="inventario" onChange={this.handleChange} value={form?form.inventario: ''}/>
                    <br />
                    <label htmlFor="vehiculo">Vehiculo</label>
                    <input className="form-control" type="text" name="vehiculo" id="vehiculo" onChange={this.handleChange} value={form?form.vehiculo: ''}/>
                    <br />
                    <label htmlFor="descripcion">Descripción</label>
                    <input className="form-control" type="text" name="descripcion" id="descripcion" onChange={this.handleChange} value={form?form.descripcion: ''}/>
                    <br />
                    <label htmlFor="chofer">Chofer</label>
                    <input className="form-control" type="text" name="chofer" id="chofer" onChange={this.handleChange} value={form?form.chofer: ''}/>
                    <br />
                    <label htmlFor="fechaSalida">Fecha Sálida</label>
                    <input className="form-control" type="text" name="fechaSalida" id="fechaSalida" onChange={this.handleChange} value={form?form.fechaSalida:''}/>
                    <br />
                    <label htmlFor="fechaLlegada">Fecha Llegada</label>
                    <input className="form-control" type="text" name="fechaLlegada" id="fechaLlegada" onChange={this.handleChange} value={form?form.fechaLlegada: ''}/>
                    <br />
                    <label htmlFor="observaciones">Observaciones</label>
                    <input className="form-control" type="text" name="observaciones" id="observaciones" onChange={this.handleChange} value={form?form.observaciones: ''}/>
                    
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar el registro? {form && form.nombre}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>



  );
}
}
export default Vehiculo;