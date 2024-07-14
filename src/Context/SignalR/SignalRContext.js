import {
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { createContext } from "react";
import { getAccessToken } from "../../utils/get-access-token.utils";


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
        .withUrl(`${process.env.REACT_APP_HUB}`, {
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
      const event =  new Event("error");
      event.err = e;
      window.dispatchEvent(event);
  }
}

export const SignlRContext = createContext(context);
