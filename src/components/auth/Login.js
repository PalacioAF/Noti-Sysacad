import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/auth/authContext";
import Spinner from "../spinner/Spinner";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { message, authenticated, logIn } = authContext;

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const [loading, setLoading] = useState(false);

  // En caso de que el password o usuario no exista
  useEffect(() => {
    setLoading(false);
    if (authenticated) {
      props.history.push("/main");
    }

    if (message) {
      showAlert(message.msg, message.category);
    }
  }, [message, authenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validar que no haya campos vacios
    if (email.trim() === "" || password.trim() === "") {
      showAlert("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //Spinner
    setLoading(true);
    // Pasarlo al action
    logIn({ email, password });
  };

  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}> {alert.msg} </div>
      ) : null}

      <div className="contenedor-form sombra-dark">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={onSubmit}>
              <div className="campo-form">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Tu Email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="campo-form">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Tu Password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div className="campo-form">
                <input
                  type="submit"
                  className="btn btn-primario btn-block"
                  value="Iniciar Sesión"
                />
              </div>
            </form>
            <Link to={"/sign-up"} className="enlace-cuenta">
              Obtener Cuenta
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
