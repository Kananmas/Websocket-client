import {
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { createContext } from "react";
import { getAccessToken } from "../../utils/get-access-token";

const context = {
  connection: null,
  async Reconnect() {
    ChatConnection(context);
  },
};

async function ChatConnection(context) {
  try {
    if (!getAccessToken()) return;
    if (!context.connection) {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44381/chatHub", {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
          withCredentials: false,
          accessTokenFactory: () => getAccessToken(),
        })
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect(2000)
        .build();

      await connection.start();

      context.connection = connection;
    }
    context = { ...context };
  } catch (e) {
    console.log(e);
  }
}

export const SignlRContext = createContext(context);
