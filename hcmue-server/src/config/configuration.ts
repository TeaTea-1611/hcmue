export default () => ({
  port: process.env.PORT || 4000,

  // redis
  session_secret: process.env.SESSION_SECRET,
  redis_host: process.env.REDIS_HOST,
  redis_port: parseInt(process.env.REDIS_PORT),
  redis_db: parseInt(process.env.REDIS_DB),
  redis_username: process.env.REDIS_USERNAME,
  redis_password: process.env.REDIS_PASSWORD,

  email_app: process.env.EMAIL_APP,
  email_app_password: process.env.EMAIL_APP_PASSWORD,
});
