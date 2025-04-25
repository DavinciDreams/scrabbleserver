// src/config/index.ts

import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/mydatabase',
  },
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
};
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1981188",
  key: "88011bfb3b1f189c5996",
  secret: "5f215ca6a7ef168284b3",
  cluster: "us2",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});
export default config;