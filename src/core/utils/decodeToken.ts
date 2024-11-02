const b64DecodeUnicode = (input: string) => {
  return decodeURIComponent(
    atob(input).replace(/(.)/g, (_, p) => {
      let code = p.charCodeAt(0).toString(16).toUpperCase();

      if (code.length < 2) {
        code = "0" + code;
      }

      return "%" + code;
    })
  );
};

const base64UrlDecode = (input: string) => {
  let output = input.replaceAll("-", "+").replaceAll("_", "/");

  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw new Error("Input is not of the correct length.");
  }

  try {
    return b64DecodeUnicode(output);
  } catch (error) {
    return atob(output);
  }
};

export const decodeToken = (token: string) => {
  const [_, payload] = token.split(".");

  if (typeof payload !== "string") {
    throw new Error("Unable to decode token, payload not found.");
  }

  let decoded;

  try {
    decoded = base64UrlDecode(payload);
  } catch (error) {
    throw new Error(
      "Unable to decode token, payload is not a valid Base64URL value.",
      { cause: error }
    );
  }

  try {
    return JSON.parse(decoded);
  } catch (error) {
    throw new Error(
      "Unable to decode token, payload is not a valid JSON value.",
      { cause: error }
    );
  }
};
