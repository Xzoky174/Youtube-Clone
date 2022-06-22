function getFormBody(params: {}) {
  var formBody = [];
  for (var property in params) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(params[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&");
}

export default async function getAccessToken(refresh_token: string) {
  const body = getFormBody({
    refresh_token,
    grant_type: "refresh_token",
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
  });

  return await (
    await fetch("https://accounts.google.com/o/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    })
  ).json();
}
