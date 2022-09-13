import { Route, Routes } from "react-router-dom";
import Producto from "../pages/Producto/Producto";
import Error404 from "../pages/Error404/Error404";
import LogIn from "../pages/Session/LogIn";
import Inicio from "../pages/Home/Inicio";
import Clientes from "../pages/Clientes/Clientes";
import Layout from "../pages/Layout/Layout";
import UserSession from "../pages/Session/LogOut";
import { Navigate } from "react-router-dom";
import Usuario from "../pages/Users/Usuario";
import Prueba from "../pages/prueba";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../components/services/Firebase';
// import db from '../../services/Firebase';
import { useState } from "react";

const Rutas = () =>{
    const [token, setToken] = useState('')
    const [authe, setAuth] = useState()
    const user = UserSession()
    onAuthStateChanged(auth, (currentUser) =>{
        if (currentUser){
            setAuth(true)
            currentUser.getIdToken().then((token) =>{
                setToken(token);
            })
            
        }else{
            setToken(null)
        }
    })
    return ( 
        <>
        {authe ? <Prueba token={token}/> : ''}
            <Routes>
                <Route exact path='/' element={UserSession() ? <Layout role={user.rol} /> : <LogIn />} >
                <Route exact path='/inicio' element={UserSession() ? <Inicio /> : <LogIn />} />
                <Route exact path='/productos' element={UserSession() ? <Producto role={user.rol} /> : <LogIn />} />
                <Route exact path='/clientes' element={UserSession() ? <Clientes role={user.rol} /> : <LogIn />} />
                <Route exact path='/usuario' element={UserSession() ? <Usuario role={user.rol} /> : <LogIn />} />
                </Route>
                <Route exact path="/login" element={UserSession() ? <Navigate to="/inicio" /> : <LogIn />} />
                <Route path='*' element={<Error404 />} />
            </Routes>
        </>
                
    );
}
export default Rutas;
