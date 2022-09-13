import {isMobile} from 'react-device-detect';
import '../../css/BarraDeNavegacion.css';
import NavLink from '../Layout/NavLinkNuevo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserFriends, faList, faListCheck } from '@fortawesome/free-solid-svg-icons'

const BarraNavegacion = () => {

    if(!isMobile){
        return (
            <div>
                <nav className="navBar">
                    <li className="nav-itemPC">
                        <NavLink className="nav-link" to='/inicio'><FontAwesomeIcon icon={faHome} />Inicio</NavLink>
                    </li>
                    <li className="nav-itemPC">
                        <NavLink className="nav-link" to='/productos'><FontAwesomeIcon icon={faList} />Productos</NavLink>
                    </li>
                    <li className="nav-itemPC">
                        <NavLink className="nav-link" to='/clientes'><FontAwesomeIcon icon={faUserFriends} />Clientes</NavLink>
                    </li>
                    <li className="nav-itemPC">
                        <NavLink className="nav-link" to='/inventario'><FontAwesomeIcon icon={faListCheck} />Inventario</NavLink>
                    </li>
                </nav>
            </div>
        )
    } else{
        return (
            <div>
            <nav className="nav justify-content-center">
            <li className="nav-item">
                <NavLink className="nav-link" to='/'>Principal</NavLink>
            </li>
            
            <li className="nav-item">
                <NavLink to='/Productos'>Productos</NavLink>
            </li>
            <li className="nav-item">    
                <NavLink className="nav-link" to='/Clientes'>Clientes</NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to='/Inventario'>Inventario</NavLink>
            </li>
            </nav>
        </div>
        )
    }
}
export default BarraNavegacion;