class UniqueConstraintError extends Error {
  constructor(value) {
    super(`${value} must me unique.`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError);
    }
  }
}

class InvalidPropertyError extends Error {
  constructor(msg) {
    super(`${msg} `);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPropertyError);
    }
  }
}

class RequiredParamsError extends Error {
  constructor(param) {
    super(`${param} cannot be null or undefined.`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredParamsError);
    }
  }
}

class NotFoundError extends Error {
  constructor(prop) {
    super(`${prop} was not found in db.`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}

class WrongCredentialsError extends Error {
  constructor() {
    super(`wrong credentials.`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, WrongCredentialsError);
    }
  }
}

module.exports = {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParamsError,
  NotFoundError,
  WrongCredentialsError,
};
