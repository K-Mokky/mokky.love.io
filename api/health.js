const { APP_NAME, MAKER, sendJson } = require("./_utils");

module.exports = function health(req, res) {
  sendJson(res, 200, {
    ok: true,
    appName: APP_NAME,
    maker: MAKER,
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
    supabaseConfigured: Boolean(
      process.env.SUPABASE_URL &&
        (process.env.SUPABASE_SERVICE_ROLE_KEY ||
          process.env.SUPABASE_ANON_KEY ||
          process.env.SUPABASE_PUBLISHABLE_KEY),
    ),
  });
};
