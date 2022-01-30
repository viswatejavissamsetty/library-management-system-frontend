module.exports = [{
  context: [
    "/users",
    "/auth",
    "/books",
    "/book-orders",
    "/notifications",
  ].map((url) => '/api' + url),
  target: "http://localhost:3000",
  secure: false,
}, ];
