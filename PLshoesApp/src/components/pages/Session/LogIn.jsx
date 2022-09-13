import { useNavigate } from "react-router-dom";
import '../../css/LogIn.css';
import ParticlesBg from 'particles-bg'
import { useState } from "react";
import { auth } from '../../services/Firebase'
import { signInWithEmailAndPassword  } from "firebase/auth";
import { useEffect } from "react";

const LogIn  = () =>{
    const navigation = useNavigate();
    const [LoginEmail, setLoginEmail] = useState("")
    const [LoginPassword, setLoginPassword] = useState("")
    
    const noRefresh = e =>{
        e.preventDefault()
    }

    const logIn = async() => {
        try{
            await signInWithEmailAndPassword(auth, LoginEmail, LoginPassword)
            .then(rta => {
                navigation('/inicio');
            })
            .catch(() =>{
                alert("Verifique los datos")
            })
        }
        catch{
            alert("Error, algo salio mal")
        }
    }
    useEffect(() => {

    }, [])
    
    return(
          <div className="containerLogin">
                <div className="containerSecundario">
                    <form onSubmit={noRefresh}>
                        <div className="form-group">
                            <div className="containerTitulo">
                                <h1>Iniciar Sesion</h1>
                            </div>
                            <hr className="LineaHorizontal" />
                            <label htmlFor='user'>Usuario</label>
                            <input type='text' id='user' name='usuUserName' className='form-control' onChange={(e) => setLoginEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor='pass'>Contraseña</label>
                            <input type='password' id='pass' name='usuPassword' className='form-control' onChange={(e) => setLoginPassword(e.target.value)} />
                        </div>
                        <div className="btncontainer">
                            <input className="btnLogIn" type="submit" value='Iniciar sesion' onClick={logIn} />
                        </div>
                    </form>

                </div>
              <ParticlesBg color="#fafafa" num={100} type="cobweb" bg={true} />
            </div>
    );
};
export default LogIn;