import React, {useContext} from 'react';
import Tarea from '../tareas/Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareasContext from '../../context/Tareas/tareasContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group'


const ListadoTareas = () => {
    
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

    const tareaContext = useContext(tareasContext);
    const {tareasProyecto} = tareaContext;


    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    const [proyectoActual] = proyecto

    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }
    
    return (  
        <>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className='listado-tareas'>
                {tareasProyecto.length === 0  
                    ? (<li className='tarea'><p>No hay tareas</p></li>)
                    : <TransitionGroup>
                        {tareasProyecto.map(tarea => (
                            <CSSTransition
                                key={tarea.id}
                                timeout={200}
                                classNames='tarea'
                            >
                                <Tarea
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
                <button
                    type='button'
                    className='btn btn-eliminar'
                    onClick={onClickEliminar}
                >Eliminar Proyecto &times;</button>
            </ul>
        </>
    );
}

export default ListadoTareas;