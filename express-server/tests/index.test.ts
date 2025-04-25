import Pusher from 'pusher-js';
//import app from '../src/app';

  // Enable pusher logging - don't include this in production

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