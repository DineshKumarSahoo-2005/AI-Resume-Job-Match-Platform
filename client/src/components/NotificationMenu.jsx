import { useState, useEffect } from "react";

import { getNotifications, markAsRead } from "../services/notificationService";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

function NotificationMenu() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      socket.emit("join", user._id);
    }
  }, []);

  useEffect(() => {
    socket.on("newNotification", () => {
      fetchNotifications();
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();

      setNotifications(data.notifications);
    } catch (error) {
      console.error("Notification Error", error);
    }
  };

  const handleRead = async (id) => {
    try {
      await markAsRead(id);

      fetchNotifications();
    } catch (error) {
      console.error("Notification Error", error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
  relative
  w-10
  h-10
  rounded-full
  bg-slate-100
  dark:bg-slate-800
  "
      >
        🔔
        {unreadCount > 0 && (
          <span
            className="
      absolute
      -top-1
      -right-1
      bg-red-500
      text-white
      text-xs
      rounded-full
      w-5
      h-5
      flex
      items-center
      justify-center
      "
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="
          absolute
          right-0
          mt-4
          w-96
          max-h-[500px]
          overflow-y-auto
          bg-white
          dark:bg-slate-900
          rounded-3xl
          shadow-2xl
          border
          border-slate-200
          dark:border-white/10
          z-50
          "
        >
          <div className="p-5">
            <h2
              className="
              text-xl
              font-bold
              mb-4
              "
            >
              Notifications
            </h2>

            {notifications.length === 0 ? (
              <p
                className="
                  text-slate-400
                  "
              >
                No Notifications
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={async () => {
                    await handleRead(n._id);

                    if (n.type === "application") {
                      navigate("/my-applications");
                    }

                    if (n.type === "interview") {
                      navigate("/interviews");
                    }

                    if (n.type === "offer") {
                      navigate("/my-offers");
                    }
                  }}
                  className="
                      p-3
                      rounded-xl
                      mb-2
                      cursor-pointer
                      hover:bg-slate-100
                      dark:hover:bg-slate-800
                      "
                >
                  <h3
                    className="
                        font-semibold
                        "
                  >
                    {n.type === "application" && "📥 "}
                    {n.type === "status" && "📌 "}
                    {n.type === "interview" && "📅 "}
                    {n.type === "offer" && "🎉 "}
                    {n.title}
                  </h3>

                  <p className="text-sm text-slate-400">{n.message}</p>

                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>

                  {!n.isRead && (
                    <span
                      className="
                            text-xs
                            text-green-400
                            "
                    >
                      New
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationMenu;
