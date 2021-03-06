import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

const RutaPrivada = ({ component: Component, ...props  }) => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando } = authContext;

    return ( 
        <Route { ...props } render={ props => !autenticado && !cargando ?  (
            <Redirect to="/" />
        )  : (
            <Component {...props} />
        ) } />

    );
}

export default RutaPrivada;