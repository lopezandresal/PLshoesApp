import '../../css/Layout.css';
import BarraNavegacion from './BarraDeNavegacion';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from './Header'

//Colors https://colorcodes.io/gray/rich-gray-color-codes/
const Layout = ({role, children}) => {
    const [status, setStatus] = useState(true);
    
    return (
        <div className="grid-contenedor">
            
            <Header role={role}>
                    <div className='ContainerBtnShow'>
                        <button className='BtnShow' onClick={()=>setStatus(!status)}>&#9776;</button>
                    </div>
            </Header>
                        

            <aside id='sidebar' className={status ? 'aside activeSideBar' : 'aside'} >
            <p className='LogoText'>plshoes</p>
                <BarraNavegacion />
            </aside>

            <main className="main">
                {children}
                <Outlet />
            </main>
        </div>
    )
}
export default Layout;