import React, { useEffect, useContext } from "react";
import Bar from "../layout/Bar";
import FormNotification from "../notification/FormNotification";
import NotificationList from "../notification/NotificationList";
import AuthContext from "../../context/auth/authContext";

const Main = () => {
  const authContext = useContext(AuthContext);
  const { authenticatedUser } = authContext;

  useEffect(() => {
    authenticatedUser();
  }, []);

  return (
    <div className="contenedor-app">
      <div className="seccion-principal">
        <Bar />
        <main>
          <FormNotification />
          <div className="contenedor-tareas">
            <NotificationList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;
