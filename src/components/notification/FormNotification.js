import React, { useState, useContext } from "react";
import notificationContext from "../../context/notification/notificationContext";

const now = new Date();
now.setHours(now.getHours() - 3);
const today = now.toISOString().split('T')[0];

const FormNotification = () => {
  const [notification, setNotification] = useState({
    title: "",
    description: "",
    date:today
  });

  const { title, description, date } = notification;

  const notificationsContext = useContext(notificationContext);
  const {
    addNotification,
    errorNotification,
    valitateNotification,
    getNotifications,
  } = notificationsContext;

  const handleChange = (e) => {
    setNotification({
      ...notification,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "" || date.trim() === "") {
      valitateNotification();
      return;
    }

    addNotification(notification);

    getNotifications();

    setNotification({
      title: "",
      description: "",
      date:today
    });
  };

  return (
    <div className="formulario form">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Título..."
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="date"
            className="input-text"
            placeholder="Fecha"
            name="date"
            value={date}
            min={today}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <textarea
            className="input-textarea"
            placeholder="Descripción..."
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={"Enviar notificación"}
          />
        </div>
      </form>
      {errorNotification ? (
        <p className="mensaje error">
          Ingresar todos los datos de la notificación
        </p>
      ) : null}
    </div>
  );
};

export default FormNotification;
