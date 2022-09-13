
import '../../css/Producto.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from "react";
import Modal from '../Layout/Modal';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import { ListarProductos } from './ProductosPromises';
import { useModal } from '../Layout/useModal';
import GuardarProductoModulo from './GuardarProducto'
import ActualizarProductoModulo from './ActualizarProducto'
import db from "../../services/Firebase";
import { collection, getDocs  } from "firebase/firestore";

const Producto = () => {
    const [isOpenModal1, openModal1, closeModal1] = useModal(false)
    const [isOpenModal2, openModal2, closeModal2] = useModal(false)
    const [productoEdit, setProductoEdit] = useState({});
    const col = [
        {
        title: 'Codigo',
        field: 'codProducto',
        width: '60px'
        },
        {
        title: 'Nombre de producto',
        field: 'prodNombre'
        },
        {
        title: 'Descripcion',
        field: 'prodDescripcion'
        },
        {
        title: 'Precio',
        field: 'prodPrecio',
        width: '90px'
        },
        {
        title: 'Stock',
        field: 'prodStock',
        width: '70px'
        },
        {
        title: 'Estado',
        field: 'prodEstado'
    
        },
    ]

    
    const [Data, setData] = useState([]);   //Se listan los productos 
    
    useEffect(() => {
        const prueba = async () => {
            const data = await getDocs(collection(db, "Producto"))
            setData(data.docs.map(k => k.data().producto));
        };
        prueba();
    }, []);
    
    return (
        <div className="ProdContainer">
            <Modal
                isOpen={isOpenModal1}
                closeModal={closeModal1}
                titulo='Agregar Producto'>
                {isOpenModal1 ? <GuardarProductoModulo children={<button className='btn btn-danger btn-sm' onClick={closeModal1}>Cancelar</button>} /> : ''}
            </Modal>
            <Modal
                isOpen={isOpenModal2}
                closeModal={closeModal2}
                titulo='Modificar Producto'>
                {isOpenModal2 ? <ActualizarProductoModulo productoInfo={productoEdit} children={<button className='btn btn-danger btn-sm' onClick={closeModal2}>Cancelar</button>} /> : ''}
            </Modal>

            <MaterialTable
                columns={col}
                data={Data}
                title='Productos'
                // isLoading={props.loading}
                
                components={{
                    Action: props => (
                        <Dropdown>
                            <Dropdown.Toggle
                                className='custom'
                                id="dropdown-basic">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-three-dots-vertical trespuntos"
                                    viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => {setProductoEdit(props.data) 
                                    openModal2()}}>Editar</Dropdown.Item>
                                {/* <Dropdown.Item onClick={() => ActualizarEstado(props.data.prodId, estado)}>Desactivar</Dropdown.Item>
                                <Dropdown.Item onClick={() => EliminarProducto(props.data.prodId)}>Eliminar</Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>
                    ),
                    Toolbar: props => (
                        <div className='ContainerBtnAddProd'><MTableToolbar {...props} />
                            <button className='btnAddProd' onClick={openModal1}><FontAwesomeIcon icon={faPlus} className='' /></button>
                        </div>
                    )
                }}
                columnsHiddenInColumnsButton = 'true'
                actions={[
                    {
                        icon: 'save',
                        tooltip: 'Save User'
                    }
                ]}
            />
        </div>
    )
}
export default Producto;