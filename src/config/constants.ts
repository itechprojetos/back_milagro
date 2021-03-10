export const jwt = {
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
};

export const mail = {
  local: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    username: process.env.MAIL_USERNAME,
    passport: process.env.MAIL_PASSWORD,
  },
};
