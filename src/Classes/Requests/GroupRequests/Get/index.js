import { BaseRequest } from "../../BaseRequest";

export class GetGroupsByName extends BaseRequest {
  constructor(name) {
    super();
    this.params = {
      name,
    };

    this.controllerUrl = "/GetGroupsByName";
  }
}
