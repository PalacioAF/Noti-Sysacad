import React, { useState, useContext } from "react";
import notificationContext from "../../context/notification/notificationContext";

const FormNotification = () => {
  const [notification, setNotification] = useState({
    title: "",
    description: ""
  });

  const { title, description } = notification;

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

    if (title.trim() === "" || description.trim() === "") {
      valitateNotification();
      return;
    }

    addNotification(notification);

    getNotifications();

    setNotification({
      title: "",
      description: ""
    });
  };

  return (
    <div className="formulario form">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="título..."
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <textarea
            className="input-textarea"
            placeholder="descripción..."
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
          El título de la notificación es obligatorio
        </p>
      ) : null}
    </div>
  );
};

export default FormNotification;
