const fetch = require("node-fetch");
const { getOptions, parseCookies } = require("./lib/util");
const fs = require("fs");

let SETTINGS = {
  DOMAIN: "https://www.dungeonsdelicacy.com/",
  svSession:
    "bf019258e09b71296c946508f2c03d37d3e940f874e16137f4b52682f67bdbc75ab5341119190801ed6e70ad1f373d181e60994d53964e647acf431e4f798bcd61e9f2643dd59033d2f8e2a1a41a07865a8148050567bfe9695733631bbf9efa",
};

const init = async () => {
  let res = await fetch(SETTINGS.DOMAIN, getOptions());
  let data = await res.text();
  data = data.split("var rendererModel")[1].split("publicModel")[0];
  let metaSiteId = data.split('metaSiteId":"')[1].split('"')[0];
  let collectionId = data.split('smcollectionId":"')[1].split('"')[0];

  let result = { metaSiteId, collectionId };
  Object.assign(SETTINGS, result);
  return result;
};

const login = async (account, password) => {
  let res = await fetch(
    SETTINGS.DOMAIN + "_api/wix-sm-webapp/member/login",
    getOptions({ hasBody: true, account, password, ...SETTINGS })
  );
  let data = await res.json();
  return data;
};

const get = async (url) => {
  let res = await fetch(url, getOptions());
  let data = await res.text();
  return data;
};

const main = (account, password) => {
  (async () => {
    await init();
    const data = await login(account, password);
    Object.assign(SETTINGS, {
      cookie: { [data.payload.cookieName]: data.payload.sessionToken },
    });
    const html = await get(
      "https://www.dungeonsdelicacy.com/forum/su-cai-fan-mai"
    );
    fs.writeFileSync(`html/${Date.now()}.html`, html);
  })();
};

main("account", "password");
