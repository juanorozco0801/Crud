import React, {useContext, useState} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
    
    const proyectosContext = useContext(proyectoContext);
    const {formulario, mostrarFormulario, agregarProyecto, errorFormulario, mostrarError} = proyectosContext;

    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    const {nombre} = proyecto

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitProyecto = e => {
        e.preventDefault();

        if(nombre === ''){
            mostrarError()
            return;
        } 
        
        agregarProyecto(proyecto)

        guardarProyecto({
            nombre: ''
        })
    }
    
    return (  
        <>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={() => mostrarFormulario()}
            >
                Nuevo Proyecto
            </button>
            {
                formulario 
                ? 
                    (
                        <form
                            className='formulario-nuevo-proyecto'
                            onSubmit={onSubmitProyecto}
                        >
                        <input
                            type='text'
                            className='input-text'
                            placeholder='Nombre Proyecto'
                            name='nombre'
                            value={nombre}
                            onChange={onChangeProyecto}
                        />
                        <input
                            type='submit'
                            className='btn btn-primario btn-block'
                            value='Agregar Proyecto'
                        />
                        </form>
                    )
                : null
            }
            {errorFormulario ? <p className='mensaje error'>El nombre del proyecto es obligatorio</p>
            : null}
        </>
    );
}

export default NuevoProyecto;