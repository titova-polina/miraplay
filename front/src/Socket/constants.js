export const DEFAULT_EVENTS = {
  connect: "connect",
  error: "connect_error",
  disconnect: "disconnect",
};

export const DISCONNECT_REASONS = {
  server: "io server disconnect",
  client: "io client disconnect",
  timeout: "ping timeout",
  close: "transport close",
  error: "transport error",
};

export const INCOMMING_MESSAGES = {
  game_comments_updated: "game_comments_updated",
  user_count: "user_count",
};
