// import Producto from "./Producto";
import { addDoc,collection, getDocs  } from "firebase/firestore";
import db from "../../services/Firebase";

export const ListarUsuarios = async () => { 
        // const datos = []
        // const vaar = await getDocs(collection(db, "Producto"))
        // vaar.forEach(e => datos.push(e.data().producto))
        // return datos
        return await getDocs(collection(db, "Usuario"))
}

export const AgregarUsuario = async (usuario) =>{
       return await addDoc(collection(db, "Producto"),{usuario})
}
export const ActualizarUsuarios = async (usuario) => {
} 