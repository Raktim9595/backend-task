import BaseError from "./";
import { HttpStatusCode } from "./error.types";

class API404Error extends BaseError {
  constructor(description = "NOT FOUND") {
    super("NOT FOUND", HttpStatusCode.NOT_FOUND, true, description);
  }
}

class API500Error extends BaseError {
  constructor(description = "INTERNAL SERVER ERROR") {
    super(
      "INTERNAL SERVER ERROR",
      HttpStatusCode.INTERNAL_SERVER,
      true,
      description
    );
  }
}

class API400Error extends BaseError {
  constructor(description = "BAD REQUEST") {
    super("BAD REQUEST", HttpStatusCode.BAD_REQUEST, true, description);
  }
}

export default { API404Error, API400Error, API500Error };
