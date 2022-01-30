const baseUrl = 'http://localhost:3000/';

// export const urls = {
//   // auth
//   auth: baseUrl + 'auth/login',
//   // Users
//   profile: baseUrl + '/users/profile',
//   newUser: baseUrl + '/users/new-user',
//   getUsersData: baseUrl + '/users/get-users-data',
//   changePassword: baseUrl + '/users/change-password',
//   // Books
//   allBooks: baseUrl + 'books/all-books',
//   book: baseUrl + 'books/book',
//   newBook: baseUrl + 'books/new-book',
//   // Book Orders
//   newBookOrder: baseUrl + 'book-orders/new-request',
//   getAllUserPlannedBooks: baseUrl + 'book-orders/get-all-user-planned-books',
//   getAllPlannedBooks: baseUrl + 'book-orders/get-all-planned-books',
//   getAllUserTakenBooks: baseUrl + 'book-orders/get-all-user-taken-books',
//   getAllTakenBooks: baseUrl + 'book-orders/get-all-taken-books',
//   takeBook: baseUrl + 'book-orders/take-book',
//   returnBook: baseUrl + 'book-orders/return-book',
//   cancelBook: baseUrl + 'book-orders/cancel-book',
//   // Notifications
//   notifications: 'notifications',
// };

export const urls = {
  // auth
  auth: 'api/auth/login',
  // Users
  profile: 'api/users/profile',
  newUser: 'api/users/new-user',
  getUsersData: 'api/users/get-users-data',
  changePassword: 'api/users/change-password',
  // Books
  allBooks: 'api/books/all-books',
  book: 'api/books/book',
  newBook: 'api/books/new-book',
  // Book Orders
  newBookOrder: 'api/book-orders/new-request',
  getAllUserPlannedBooks: 'api/book-orders/get-all-user-planned-books',
  getAllPlannedBooks: 'api/book-orders/get-all-planned-books',
  getAllUserTakenBooks: 'api/book-orders/get-all-user-taken-books',
  getAllTakenBooks: 'api/book-orders/get-all-taken-books',
  takeBook: 'api/book-orders/take-book',
  returnBook: 'api/book-orders/return-book',
  cancelBook: 'api/book-orders/cancel-book',
  // Notifications
  notifications: 'api/notifications',
};

export default urls;