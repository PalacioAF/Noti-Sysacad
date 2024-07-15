import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";

const Bar = () => {
  const authContext = useContext(AuthContext);
  const { user, authenticatedUser, signOff } = authContext;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    authenticatedUser();
  }, []);

  return (
    <header className="app-header">
      {user ? (
        <p className="nombre-usuario">
          Bienvenido(a) <span>{user.name} </span>{" "}
        </p>
      ) : null}

      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => signOff()}
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
};

export default Bar;
