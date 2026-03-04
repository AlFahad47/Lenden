import PusherJS from "pusher-js";

// Enable Pusher logging in browser console so we can see what's happening
PusherJS.logToConsole = true;

const pusherClient = new PusherJS(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});

export default pusherClient;
