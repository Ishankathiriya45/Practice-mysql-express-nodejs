const {
  ApiResponse: { failAuthorization, serverError, badRequest },
} = require("../responses");
const {
  CryptoUtil: { decryptData, encryptData },
} = require("../utils");

const checkRequest = async (req, res) => {
  const { requesttoken } = req.headers;

  if (!requesttoken) {
    return {
      valid: false,
      message: "Request token not found",
    };
  }

  const decryptToken = decryptData(requesttoken).trim().toLowerCase();
  // console.log({ decryptToken });

  if (decryptToken.includes("?exp=")) {
    return {
      valid: false,
      message: "Token is invalid.",
    };
  }

  // console.log({ TOKEN_VALID: decryptToken });
  const plainText = decryptToken.split("?exp=")[0]
  const exp = decryptToken.split("?exp=")[1]

  const encryptionMessage =
    process.env["ENCRYPTION_MESSAGE_" + process.env.RUN_MODE];

  if (decryptToken === encryptionMessage) {
    return {
      valid: true,
    };
  }
};

const checkAuth = async (req, res, next) => {
  const requestToken = await checkRequest(req, res);

  if (requestToken.valid == true) {
    next();
  } else {
    return res
      .status(401)
      .send(
        failAuthorization(
          checkRequest.message ? checkRequest.message : "Invalid token.",
          null,
          {}
        )
      );
  }
};

module.exports = {
  checkAuth,
};
