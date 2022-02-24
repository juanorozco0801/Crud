import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareasContext from '../../context/Tareas/tareasContext';


const FormTarea = () => {
    
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    const tareaContext = useContext(tareasContext);
    const {errorTarea, agregarTarea, validarTarea, obtenerTareas, tareaSeleccionada, actualizarTarea, limpiarTarea} = tareaContext;

    useEffect(() => {
        if(tareaSeleccionada !== null) {
            guardarTarea(tareaSeleccionada)
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada])

    const [tarea, guardarTarea] = useState({
        nombre: ''
    }, [])

    const {nombre} = tarea

    if(!proyecto) return null

    const [proyectoActual] = proyecto

    const handleChange = (e) => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(nombre.trim() === ''){
            validarTarea()
            return 
        }

        if(tareaSeleccionada === null){
            tarea.proyecto = proyectoActual._id;
            tarea.estado = false;
            agregarTarea(tarea);
        } else {
            actualizarTarea(tarea);
            limpiarTarea();
        }

        obtenerTareas(proyectoActual.id);

        guardarTarea({
            nombre: ''
        })


    }

    return (  
        <div className='formulario'>
            <form
                onSubmit={onSubmit}
            >
                <div className='contenedor-input'>
                    <input
                        type='text'
                        className='input-text'
                        placeholder='Nombre Tarea...'
                        name='nombre'
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className='contenedor-input'>
                    <input
                        type='submit'
                        className='btn btn-primario btn-submit btn-block'
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errorTarea ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
}

export default FormTarea;