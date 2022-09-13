import { onAuthStateChanged } from "firebase/auth";
import { auth,  } from '../../services/Firebase';
import db from '../../services/Firebase';
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function UserSession() {
    const [user, setUser] = useState({})

    async function getRol (uid){
        const docuRef = doc(db, "Usuario", `${uid}`);
        const docuCifrada = await getDoc(docuRef)
        const infoFinal = docuCifrada.data().rol
        return infoFinal
    }
    function getUserSignInAndRol(currentUser){
        getRol(currentUser.uid).then((rol) =>{
            const userData = {
                uid:currentUser.uid,
                email: currentUser.email,
                rol: rol,
            }
            setUser(userData)
        })
    }
    onAuthStateChanged(auth, (currentUser) =>{
        if (currentUser){
            if(!user){
                getUserSignInAndRol(currentUser)
            }
        }else{
            setUser(null)
        }
    })
    return user
}
