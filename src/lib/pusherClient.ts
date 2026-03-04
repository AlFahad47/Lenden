import PusherJS from "pusher-js";

// Client-side Pusher instance
// Used in React components (browser) to subscribe to channels and receive messages
// Only uses NEXT_PUBLIC_ keys — these are safe to expose to the browser
// NEXT_PUBLIC_ prefix tells Next.js to include these variables in the browser bundle

const pusherClient = new PusherJS(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});

export default pusherClient;
