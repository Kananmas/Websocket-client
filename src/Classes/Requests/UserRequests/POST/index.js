import { BaseRequest } from "../../BaseRequest";

export class PostUserRequest extends BaseRequest {
  constructor(user, extension) {
    super(extension);
    this.method = "POST";
    this.controllerUrl = "/PostUser";

    this.form.append("user", JSON.stringify(user));
  }
}
