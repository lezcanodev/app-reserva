import { ReactNode, useState } from 'react';
import PersonaPage from './pages/personas/PersonaPage'
import HabitacionPage from './pages/habitaciones/HabitacionPage';
import ReservaPage from './pages/reservas/ReservaPage';
import NavItem from './components/nav/navItem';
import Nav from './components/nav/nav';
import { FaBook } from 'react-icons/fa';
import { IoPeople } from "react-icons/io5";
import { FaDoorOpen } from "react-icons/fa";


function App() {
  
  const [page, setPage] = useState<ReactNode>(<ReservaPage/>);

  return (
    <div className='flex'>
      <Nav>
          <NavItem icon={<FaBook/>} name='Reservas' onClick={() => setPage(<ReservaPage/>)  }/>
          <NavItem icon={<IoPeople/>} name='Personas' onClick={() => setPage(<PersonaPage/>)  }/>
          <NavItem icon={<FaDoorOpen/>} name='Habitaciones' onClick={() => setPage(<HabitacionPage/>) }/>
      </Nav>
      <div className='w-full mx-auto h-lvh overflow-y-auto '>
          {page}
      </div>
    </div>
  )
}




export default App
