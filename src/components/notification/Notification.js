import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Notification = ({ notification }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <li className="tarea sombra">
      <div className="grid-container">
        <div className="contedor-notificacion">
          <p>{notification.title}</p>
          <p>{notification.description}</p>
        </div>

        <div className="estado">
          {notification.state === null ? (
            <button type="button" className="pendiente">
              Pendiente
            </button>
          ) : notification.state ? (
            <button type="button" className="completo">
              Completo
            </button>
          ) : (
            <button type="button" className="incompleto">
              Incompleto
            </button>
          )}
        </div>

        <div
          className="user-icon"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <i className="fas fa-user"></i>
          {showTooltip && (
            <span className="tooltip">
              {notification.user.name} - {notification.user.email}
            </span>
          )}
        </div>
        <p className="fecha">{notification.date && formatDate(notification.date)}</p>
      </div>
    </li>
  );
};

export default Notification;
