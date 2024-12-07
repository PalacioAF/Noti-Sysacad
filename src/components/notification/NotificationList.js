import React, { useEffect, Fragment, useContext } from "react";
import Notification from "./Notification";
import notificationContext from "../../context/notification/notificationContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const NotificationList = () => {
  const notificationsContext = useContext(notificationContext);
  const { notifications, getNotifications } = notificationsContext;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <Fragment>
      <h2>NotiAcad</h2>

      <ul className="listado-tareas">
        {notifications.length === 0 ? (
          <li className="tarea">No hay Notificaciones</li>
        ) : (
          <TransitionGroup>
            {notifications.map((notification) => (
              <CSSTransition
                key={notification._id}
                timeout={200}
                classNames="tarea"
              >
                <Notification notification={notification} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
    </Fragment>
  );
};

export default NotificationList;
