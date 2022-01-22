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
  auth: 'auth/login',
  // Users
  profile: '/users/profile',
  newUser: '/users/new-user',
  getUsersData: '/users/get-users-data',
  changePassword: '/users/change-password',
  // Books
  allBooks: 'books/all-books',
  book: 'books/book',
  newBook: 'books/new-book',
  // Book Orders
  newBookOrder: 'book-orders/new-request',
  getAllUserPlannedBooks: 'book-orders/get-all-user-planned-books',
  getAllPlannedBooks: 'book-orders/get-all-planned-books',
  getAllUserTakenBooks: 'book-orders/get-all-user-taken-books',
  getAllTakenBooks: 'book-orders/get-all-taken-books',
  takeBook: 'book-orders/take-book',
  returnBook: 'book-orders/return-book',
  cancelBook: 'book-orders/cancel-book',
  // Notifications
  notifications: 'notifications',
};

export default urls;

// TODO: Remove me later
// auth
export const auth = baseUrl + 'auth/login';

// Users
export const profile = baseUrl + '/users/profile';
export const newUser = baseUrl + '/users/new-user';
export const getUsersData = baseUrl + '/users/get-users-data';
export const changePassword = baseUrl + '/users/change-password';

// Books
export const allBooks = baseUrl + 'books/all-books';
export const book = baseUrl + 'books/book';
export const newBook = baseUrl + 'books/new-book';

// Book Orders
export const newBookOrder = 'book-orders/new-request';
export const getAllUserPlannedBooks = 'book-orders/get-all-user-planned-books';
export const getAllPlannedBooks = 'book-orders/get-all-planned-books';
export const getAllUserTakenBooks = 'book-orders/get-all-user-taken-books';
export const getAllTakenBooks = 'book-orders/get-all-taken-books';
export const takeBook = 'book-orders/take-book';
export const returnBook = 'book-orders/return-book';
export const cancelBook = 'book-orders/cancel-book';

// Notifications
export const notifications = 'notifications';
