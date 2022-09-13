import InputComponent from '../Layout/Input';
// import { AgregarUsuario } from './UsuarioPromises';
import { useState } from "react";
import { auth } from '../../services/Firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import db from '../../services/Firebase';

const GuardarUsuarioModulo = ({ children }) => {

    const [user, setUser] = useState(
        {
            userNombre: '',
            userApellido: '',
            email: '',
            userPassword: '',
            rol: '',
        });
    async function registrarUsuario() {
        const infoUser = createUserWithEmailAndPassword(
            auth,
            user.email,
            user.userPassword).then((currentUser) => { return currentUser })

        console.log(infoUser)
        const docuRef = doc(db, "Usuario", `${(await infoUser).user.uid}`);
        setDoc(docuRef, {
            userNombre: user.userNombre,
            userApellido: user.userApellido,
            email: user.email,
            userPassword: user.userPassword,
            rol: user.rol
        })
    }
    return (
        <div className='formularioModal'>
            <div className='inputContainer'>
                <InputComponent
                    namehtml='userNombre'
                    label='Nombre'
                    labelClassName='labelClassName'
                    tipo='text'
                    placeholder='Escriba el nombre del usuario'
                    valor={user.userNombre}
                    AsignarValor={(e) => setUser({ ...user, userNombre: e.target.value })}
                />
            </div>
            <div className='inputContainer'>
                <InputComponent
                    namehtml='userApellido'
                    label='Apellido'
                    labelClassName='labelClassName'
                    tipo='text'
                    placeholder='Escriba el apellido del usuario'
                    valor={user.userApellido}
                    AsignarValor={(e) => setUser({ ...user, userApellido: e.target.value })}
                />
            </div>
            <div className='inputContainer'>
                <InputComponent
                    namehtml='email'
                    label='Email'
                    labelClassName='labelClassName'
                    tipo='email'
                    placeholder='Escriba el email del usuario'
                    valor={user.email}
                    AsignarValor={(e) => setUser({ ...user, email: e.target.value })}
                />
            </div>
            <div className='inputContainer'>
                <InputComponent
                    namehtml='userPassword'
                    label='Contraseña'
                    labelClassName='labelClassName'
                    tipo='password'
                    placeholder='Escriba la contraseña del usuario'
                    valor={user.userPassword}
                    AsignarValor={(e) => setUser({ ...user, userPassword: e.target.value })}
                />
            </div>
            <div className='inputContainer'>
                <label className='labelClassName'>Seleccione el rol</label>
                <select name="" id="" onChange={(e) => setUser({ ...user, rol: e.target.value })}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>
            <div className='BotonesCentrados'>
                <button className='btn btn-info btn-sm' onClick={registrarUsuario}> Agregar</button>
                {children}
            </div>
        </div>
    )
}
export default GuardarUsuarioModulo;