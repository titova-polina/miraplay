import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  DEFAULT_EVENTS,
  DISCONNECT_REASONS,
  INCOMMING_MESSAGES,
} from "./constants";
import { getTokens } from "../Redux/Actions";

const SOCKET_URL = "http://localhost:3003";

const socket = io(SOCKET_URL, {
  autoConnect: false,
  multiplex: false,
  secure: SOCKET_URL && !SOCKET_URL.startsWith("http://"),
});

export const connectToSocket = (tokenAccess) => {
  if (!tokenAccess) {
    return console.log("warn", "SOCKET: NO CREDS");
  }
  if (socket.connected) {
    console.log("warn", "SOCKET: MULTIPPLE CONNECTIONS NOT ALLOWED");
  }
  socket.auth = { tokenAccess };

  try {
    const data = socket.connect();
    console.log("CONNECTED", data);
  } catch (err) {
    console.log("warn", "SOCKET NOT CONNECTED: ", err);
  }
};

const handlers = [];

const subscribeToMessge = ({ event, id, cb }) => {
  const existingHandler = handlers.find((handler) => handler.id === id);
  if (existingHandler) existingHandler.cb = cb;
  else handlers.push({ event, id, cb });
};

const unsubscribeFromMessage = (subscriptionId) => {
  handlers.splice(
    handlers.findIndex((handler) => handler.id === subscriptionId),
    1
  );
};

socket.on(INCOMMING_MESSAGES.reauth, () => {
  handlers.forEach((handler) => {
    if (handler.event === INCOMMING_MESSAGES.reauth) handler.cb();
  });
});

socket.on(INCOMMING_MESSAGES.game_comments_updated, (data) => {
  handlers.forEach((handler) => {
    if (handler.event === INCOMMING_MESSAGES.game_comments_updated)
      handler.cb(data);
  });
});

socket.on(INCOMMING_MESSAGES.user_count, (data) => {
  handlers.forEach((handler) => {
    if (handler.event === INCOMMING_MESSAGES.user_count) handler.cb(data);
  });
});

socket.on(DEFAULT_EVENTS.disconnect, (reason) => {
  if (reason === DISCONNECT_REASONS.server) {
    console.log("warn", "SOCKET EVENT: DISCONNECTED BY SERVER");
  }
});

socket.on(DEFAULT_EVENTS.connect, () => {
  handlers.forEach((handler) => {
    if (handler.event === DEFAULT_EVENTS.connect) handler.cb(socket);
  });
});

socket.on(DEFAULT_EVENTS.error, () => {
  setTimeout(() => {
    socket.connect();
  }, 1000);
});

//only for use in App to avoid multipple connections
export const useConnectToSocket = () => {
  const tokenRef = useRef();
  const { tokenAccess } = useSelector(getTokens);

  useEffect(() => {
    if (tokenRef.current !== tokenAccess) {
      if (socket.connected) {
        socket.close();
      }
      connectToSocket(tokenAccess);
    }
    tokenRef.current = tokenAccess;
  }, [tokenAccess]);
};

// can be used anywhere, don`t forget to unsubscribe(subscriptionId) if you subscribe in React Component
export const useSocket = () => {
  const emit = useCallback((messageType, data, cb) => {
    if (socket.connected) {
      try {
        socket.emit(messageType, data, cb);
      } catch (err) {
        console.log("EMIT ERROR", err);
      }
    }
  }, []);

  return {
    subscribe: subscribeToMessge,
    emit,
    connected: socket.connected,
    unsubscribe: unsubscribeFromMessage,
  };
};
