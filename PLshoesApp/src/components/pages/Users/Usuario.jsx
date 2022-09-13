
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
import GuardarUsuarioModulo from './GuardarUsuario'
import db from "../../services/Firebase";
import { collection, getDocs } from "firebase/firestore";

const Usuario = ({role}) => {
    const [isOpenModal1, openModal1, closeModal1] = useModal(false)
    // const [isOpenModal2, openModal2, closeModal2] = useModal(false)
    // const [user, setUser] = useState({});
    const col = [
        {
            title: 'Nombre',
            field: 'userNombre'
        },
        {
            title: 'Apellido',
            field: 'userApellido'
        },
        {
            title: 'Correo',
            field: 'email',
        },
        {
            title: 'Tipo',
            field: 'rol',
        },
    ]


    const [Data, setData] = useState([]);   //Se listan los usuarios 

    useEffect(() => {
        const prueba = async () => {
            const data = await getDocs(collection(db, "Usuario"))
            setData(data.docs.map(k => k.data()));
        };
        prueba();
    }, []);

    return (
        <div className="ProdContainer">
            <Modal
                isOpen={isOpenModal1}
                closeModal={closeModal1}
                titulo='Agregar Usuario'>
                {isOpenModal1 ? <GuardarUsuarioModulo children={<button className='btn btn-danger btn-sm' onClick={closeModal1}>Cancelar</button>} /> : ''}
            </Modal>
            {/* <Modal
                isOpen={isOpenModal2}
                closeModal={closeModal2}
                titulo='Modificar Usuario'>
                {isOpenModal2 ? <ActualizarProductoModulo productoInfo={user} children={<button className='btn btn-danger btn-sm' onClick={closeModal2}>Cancelar</button>} /> : ''}
            </Modal> */}

            <MaterialTable
                columns={col}
                data={Data}
                title='Usuarios'
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
                                {/* <Dropdown.Item onClick={() => {
                                    setUser(props.data)
                                    openModal2()
                                }}>Editar</Dropdown.Item> */}
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
                columnsHiddenInColumnsButton='true'
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
export default Usuario;