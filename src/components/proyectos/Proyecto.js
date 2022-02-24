import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareasContext from '../../context/Tareas/tareasContext';

const Proyecto = ({proyecto}) => {
    
    const proyectosContext = useContext(proyectoContext);
    const tareaContext = useContext(tareasContext);

    const {proyectoActual} = proyectosContext;
    const {obtenerTareas} = tareaContext;

    const seleccionarProyecto = id => {
        proyectoActual(id);
        obtenerTareas(id);
    }
    
    return (  
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={ () => seleccionarProyecto(proyecto._id)}
            >
                {proyecto.nombre}
            </button>
        </li>
    );
}

export default Proyecto;