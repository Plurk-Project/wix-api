const getOptions = (bodyConfig = { hasBody: false }) => {
  if (!bodyConfig.hasBody) {
    body = null;
  } else {
    body = `email=${encodeURIComponent(
      bodyConfig.account
    )}&password=${encodeURIComponent(bodyConfig.password)}&collectionId=${
      bodyConfig.collectionId
    }&metaSiteId=${bodyConfig.metaSiteId}&appUrl=${encodeURIComponent(
      bodyConfig.DOMAIN
    )}&svSession=${bodyConfig.svSession}`;
  }
  return {
    credentials: "include",
    headers: {
      cookie: bodyConfig.cookie,
      "User-Agent":
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0",
      Accept: "application/json",
      "Accept-Language": "en-US,en;q=0.5",
      "x-wix-site-revision": "1057",
      "x-requested-with": "XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    referrer: bodyConfig.DOMAIN,
    body,
    method: bodyConfig.hasBody ? "POST" : "GET",
    mode: "cors"
  };
};

const parseCookies = response => {
  const raw = response.headers.raw()["set-cookie"];
  return raw
    .map(entry => {
      const parts = entry.split(";");
      const cookiePart = parts[0];
      return cookiePart;
    })
    .join(";");
};

exports.getOptions = getOptions;
exports.parseCookies = parseCookies;
