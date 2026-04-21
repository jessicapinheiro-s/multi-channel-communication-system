import Queue from "bull";
const HOST = process.env.REDIS_HOST;
const PASSWORD = process.env.REDIS_PASSWORD;
const PORT = Number(process.env.REDIS_PORT);


export const emailQueue = new Queue("email-queue", {
  redis: {
    host: HOST,
    port: PORT,
    password: PASSWORD,
  },
});
