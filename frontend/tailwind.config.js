/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      height: {
        "h-0.5": "2px",
        "h-chat-full": "92vh",
        "chat-messages": "73vh",
      },
    },
  },
  plugins: [],
};
