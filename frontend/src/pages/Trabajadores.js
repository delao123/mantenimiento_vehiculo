import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const url="/trabajadores";
  
class Trabajador extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    _id:'',
    nombres: '',
    trabajador: '',
    cargo: '',
    apellidos: '',
    horaEntrada: '',
    horaSalida: '',
    operacion: '',
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

seleccionarTrabajador=(trabajador)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
        id: trabajador._id,
        nombres: trabajador.nombres,
        apellidos: trabajador.apellidos,
        cargo: trabajador.cargo,
        horaEntrada: trabajador.horaEntrada,
        horaSalida: trabajador.horaSalida,
        operacion: trabajador.operacion,
        fecha: trabajador.fecha
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
        <h1>Trabajadores</h1>
      <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar trabajador</button>
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Cargo</th>
          <th>Hora de Entrada</th>
          <th>Hora de Salida</th>
          <th>Operacion</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(trabajador=>{
          return(
            <tr>
          <td>{trabajador.nombres}</td>
          <td>{trabajador.apellidos}</td>
          <td>{trabajador.cargo}</td>
          <td>{trabajador.horaEntrada}</td>
          <td>{trabajador.horaSalida}</td>
          <td>{trabajador.operacion}</td>
          <td>{trabajador.fecha}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarTrabajador(trabajador); this.modalInsertar()}}><EditIcon/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarTrabajador(trabajador); this.setState({modalEliminar: true})}}><DeleteIcon /></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  Agregar Trabajador
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                  <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: ''}/>
                    <br />
                    <label htmlFor="nombres">Nombres</label>
                    <input className="form-control" type="text" name="nombres" id="nombres" onChange={this.handleChange} value={form?form.nombres: ''}/>
                    <br />
                    <label htmlFor="apellidos">Apellidos</label>
                    <input className="form-control" type="text" name="apellidos" id="apellidos" onChange={this.handleChange} value={form?form.apellidos: ''}/>
                    <br />
                    <label htmlFor="cargo">Cargo</label>
                    <input className="form-control" type="text" name="cargo" id="cargo" onChange={this.handleChange} value={form?form.cargo: ''}/>
                    <br />
                    <label htmlFor="horaEntrada">Hora de Entrada</label>
                    <input className="form-control" type="text" name="horaEntrada" id="horaEntrada" onChange={this.handleChange} value={form?form.horaEntrada:''}/>
                    <br />
                    <label htmlFor="horaSalida">Hora de Salida</label>
                    <input className="form-control" type="text" name="horaSalida" id="horaSalida" onChange={this.handleChange} value={form?form.horaSalida: ''}/>
                    <br />
                    <label htmlFor="operacion">Operacion</label>
                    <input className="form-control" type="text" name="operacion" id="operacion" onChange={this.handleChange} value={form?form.operacion: ''}/>
                    <br />
                    <label htmlFor="fecha">Fecha</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.handleChange} value={form?form.fecha: ''}/>
  
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
               Estás seguro que deseas eliminar el registro {form && form.nombre}
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
export default Trabajador;