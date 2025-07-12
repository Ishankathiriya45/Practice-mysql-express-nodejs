const { Buffer } = require("node:buffer");
const crypto = require("node:crypto");
const password = process.env["ENCRYPTION_SECRET_KEY_" + process.env.RUN_MODE];
const algorithm = process.env["ENCRYPTION_ALGORITHM_" + process.env.RUN_MODE];
const key = crypto.scryptSync(password, "salt", 32);

module.exports = {
  encryptData: (data) => {
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(algorithm, key, iv);
      let encryptedData = cipher.update(data, "utf-8", "hex");
      encryptedData += cipher.final("hex");
      return iv.toString("hex") + ":" + encryptedData;
    } catch (error) {
      return error;
    }
  },

  decryptData: (data) => {
    try {
      const parts = data.split(":");
      if (parts.length !== 2) {
        throw new Error("Invalid encrypted data format.");
      }

      const iv = Buffer.from(parts[0], "hex");
      const encryptedText = parts[1];

      const decipher = crypto.createDecipheriv(algorithm, key, iv);
      let decryptedData = decipher.update(encryptedText, "hex", "utf-8");
      decryptedData += decipher.final("utf-8");
      return decryptedData;
    } catch (error) {
      return error;
    }
  },
};
