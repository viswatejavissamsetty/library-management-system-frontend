module.exports = [
  {
    context: [
      "/users",
      "/auth",
      "/books",
      "/book-orders",
      "/notifications",
    ],
    target: "http://localhost:3000",
    secure: false,
  },
];
