import { useEffect } from "react"
import axios from "axios";


export default function Prueba({token}) {

    useEffect(()=>{
        if(token){
            fetchData(token);
        }
    },[token])
    
    const fetchData = async (token) =>{
        const res = await axios.get('/api/todo', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        console.log(res.config.headers)
    }
    
    return (
        <div>
            <h1>Xd </h1>
        </div>
    )
};
