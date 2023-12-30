import { getFromLocalStorage } from "../../utils/get-from-localstorage.utils";


const accessToken = getFromLocalStorage("access-Token");


export class BaseRequest {
  baseUrl = process.env.REACT_APP_API;
  controllerUrl = "";
  method = "GET";
  form = new FormData();
  Authorization = accessToken ? accessToken["accessToken"] : "";
  params = {};

  async Send() {
    var url = this.baseUrl + this.controllerUrl + this.createParams();

    return fetch(url, {
      method: this.method,
      headers: this.createHeader(),
      body: this.createBody(),
    });
  }

  setData(data) {
    this.data = JSON.parse(data);
  }

  createHeader() {
    return {
      Authorization: this.Authorization ?? "",
    };
  }

  createBody() {
    if (this.method == "GET") return null;
    return this.form;
  }

  createParams() {
    const hasParams = Object.entries(this.params).length;
    if (!hasParams) return "";
    return "?" + new URLSearchParams(this.params).toString();
  }
}
