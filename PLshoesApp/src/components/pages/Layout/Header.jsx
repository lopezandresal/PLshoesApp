import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Dropdown from 'react-bootstrap/Dropdown';
import { signOut } from "firebase/auth";
import { auth } from '../../services/Firebase';
import { useNavigate } from "react-router-dom";

export default function Header({role, children}) {
    const navigation = useNavigate();
    const user = auth.currentUser;

    const LogOut = async () => {
        return await signOut(auth).then(navigation('/login'))
    }
    // console.log("rol de usuario:",role)
    return (
        <header className="header">

            <div className='ContainerElementosHeader'>
                {children}
                <Dropdown>
                    <Dropdown.Toggle
                        variant="custom"
                        id="dropdown-basic"
                        className='BtnUserDrop'>
                        <FontAwesomeIcon className='buttonUser' icon={faUserCircle} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <p>{user ? user.email : ''}</p>
                        {role==="admin" ? <Dropdown.Item onClick={()=>navigation("/usuario")} >Configuración</Dropdown.Item>: ''}
                        <Dropdown.Item onClick={() => LogOut().then()} >Cerrar sesión</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </header>
    )
}
