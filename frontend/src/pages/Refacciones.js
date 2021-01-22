import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const url="/refacciones";
  
class Refacciones extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    _id:'',
    tipo: '',
    cantidad: '',
    marca: '',
    descripcion: '',
    disponiblesTaller: '',
    disponiblesAlmacen: '',
    imagen:'',
    precioUnitario: '',
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

seleccionarRefaccion=(refaccion)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
        id: refaccion._id,
        tipo: refaccion.tipo,
        cantidad: refaccion.cantidad,
        descripcion: refaccion.descripcion,
        marca: refaccion.marca,
        disponiblesTaller: refaccion.disponiblesTaller,
        disponiblesAlmacen: refaccion.disponiblesAlmacen,
        imagen: refaccion.imagen,
        precioUnitario: refaccion.precioUnitario
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
      <h1>Tabla de Refacciones</h1>
      <br /><br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Cantidad</th>
          <th>Marca</th>
          <th>Descripción</th>
          <th>Disponible en taller</th>
          <th>Disponible en almacén</th>
          <th>Precio Unitario</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(refaccion=>{
          return(
            <tr>
          <td>{refaccion.tipo}</td>
          <td>{refaccion.cantidad}</td>
          <td>{refaccion.descripcion}</td>
          <td>{refaccion.marca}</td>
          <td>{refaccion.disponiblesTaller}</td>
          <td>{refaccion.disponiblesAlmacen}</td>
          <td>{refaccion.precioUnitario}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarRefaccion(refaccion); this.modalInsertar()}}><EditIcon/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarRefaccion(refaccion); this.setState({modalEliminar: true})}}><DeleteIcon /></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Refaccion</button>
  <br /><br />



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  Agregar Refacción
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                  <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: ''}/>
                    <br />
                    <label htmlFor="tipo">Tipo</label>
                    <input className="form-control" type="text" name="tipo" id="tipo" onChange={this.handleChange} value={form?form.tipo: ''}/>
                    <br />
                    <label htmlFor="cantidad">Cantidad</label>
                    <input className="form-control" type="text" name="cantidad" id="cantidad" onChange={this.handleChange} value={form?form.cantidad: ''}/>
                    <br />
                    <label htmlFor="descripcion">Descripción</label>
                    <input className="form-control" type="text" name="descripcion" id="descripcion" onChange={this.handleChange} value={form?form.descripcion: ''}/>
                    <br />
                    <label htmlFor="marca">Marca</label>
                    <input className="form-control" type="text" name="marca" id="marca" onChange={this.handleChange} value={form?form.marca: ''}/>
                    <br />
                    <label htmlFor="disponiblesTaller">Disponible en Taller</label>
                    <input className="form-control" type="text" name="disponiblesTaller" id="disponiblesTaller" onChange={this.handleChange} value={form?form.disponiblesTaller:''}/>
                    <br />
                    <label htmlFor="disponiblesAlmacen">Disponible en Almacén</label>
                    <input className="form-control" type="text" name="disponiblesAlmacen" id="disponiblesAlmacen" onChange={this.handleChange} value={form?form.disponiblesAlmacen: ''}/>
                    <br />
                    <label htmlFor="precioUnitario">Precio Unitario</label>
                    <input className="form-control" type="text" name="precioUnitario" id="precioUnitario" onChange={this.handleChange} value={form?form.precioUnitario: ''}/>
                    
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
               Estás seguro que deseas eliminar el registro?{form && form.nombre}
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
export default Refacciones;