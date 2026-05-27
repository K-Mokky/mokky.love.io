const { APP_NAME, MAKER, sendJson } = require("./_utils");

module.exports = function health(req, res) {
  sendJson(res, 200, {
    ok: true,
    appName: APP_NAME,
    maker: MAKER,
    imageMode: "browser-canvas",
  });
};
