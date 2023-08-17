import {
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { createContext } from "react";
import { getAccessToken } from "../../utils/get-access-token";

const context = {
  connection: null,
  Reconnect() {
    ChatConnection(this.connection);
  },
};

const accessToken = getAccessToken();

async function ChatConnection(context) {
  try {
    if (!accessToken) return;
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:44381/chatHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        withCredentials: false,
        accessTokenFactory: () => accessToken,
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect(2000)
      .build();

    await connection.start();

    context.connection = connection;
  } catch (e) {
    console.log(e);
  }
}

ChatConnection(context);

export const SignlRContext = createContext(context);
