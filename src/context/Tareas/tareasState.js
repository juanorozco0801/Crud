import React, { useReducer } from 'react';
import TareasContext from './tareasContext';
import TareasReducer from './tareasReducer';
import clienteAxios from '../../config/axios';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types'

const TareasState = (props) => {

    const initialState = 
    {
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    }
    

    const [state, dispatch] = useReducer(TareasReducer, initialState);

    const obtenerTareas = async proyecto => {

        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }});
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
        }
    }

    const agregarTarea = async tarea => {
        try {
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
        }
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA,
        })
    }

    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: { proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            
        }
    }

    const actualizarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
        }
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return (
        <TareasContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareasContext.Provider>
    )
}

export default TareasState;