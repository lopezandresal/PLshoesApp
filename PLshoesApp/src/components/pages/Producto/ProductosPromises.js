// import Producto from "./Producto";
import { addDoc,collection, getDocs  } from "firebase/firestore";
import db from "../../services/Firebase";

export const ListarProductos = async () => { 
        // const datos = []
        // const vaar = await getDocs(collection(db, "Producto"))
        // vaar.forEach(e => datos.push(e.data().producto))
        // return datos
        return await getDocs(collection(db, "Producto"))
}

export const AgregarProductos = async (producto) =>{
       return await addDoc(collection(db, "Producto"),{producto})
}
export const ActualizarProductos = async (producto) => {
} 