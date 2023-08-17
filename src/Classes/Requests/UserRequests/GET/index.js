import { BaseRequest } from "../../BaseRequest";

export class GetUserRequest extends BaseRequest {
  constructor(email, password, extention) {
    super(extention);
    this.params = {
      email,
      password,
    };

    this.controllerUrl = "/GetUserByFormData";
  }
}
