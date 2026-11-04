# LAB 03: REST API, Query Parameters, Validation and Debugging

## Student Details

- **Name:** BATCHU VENKATA MANI SAI
- **Registration Number:** 252U1R1029
- **Course:** B.Tech – Computer Science and Engineering
- **Section:** CSE-2A (S-15)
- **Lab:** Backend Development Fundamentals – Lab 03

## Live Deployment

**Render URL:** [https://batchu-venkatamanisai-lab-3.onrender.com](https://batchu-venkatamanisai-lab-3.onrender.com)

### Live API Links

| Method | API Endpoint | Description |
|---|---|---|
| GET | [Get All Books](https://batchu-venkatamanisai-lab-3.onrender.com/books/) | Retrieve all books |
| GET | [Get Book by ID](https://batchu-venkatamanisai-lab-3.onrender.com/books/1/) | Retrieve a book by ID |
| GET | [Search Books](https://batchu-venkatamanisai-lab-3.onrender.com/books/?search_q=Atomic) | Search by title |
| GET | [Sort Books](https://batchu-venkatamanisai-lab-3.onrender.com/books/?order_by=price&order=DESC) | Sort by price |
| GET | [Pagination](https://batchu-venkatamanisai-lab-3.onrender.com/books/?limit=3&offset=3) | Retrieve paginated records |
| GET | [Price Filter](https://batchu-venkatamanisai-lab-3.onrender.com/books/?min_price=300&max_price=450) | Filter by price range |
| GET | [Combined Filters](https://batchu-venkatamanisai-lab-3.onrender.com/books/?search_q=The&order_by=price&order=ASC&limit=5&offset=0&min_price=250&max_price=500) | Apply multiple filters |

POST, PUT and DELETE requests can be tested using Postman.

## Objective

To improve the Lab 02 application by developing a clean REST API with query parameters, search, sorting, pagination, price filtering, input validation, appropriate HTTP status codes and debugging.

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- Postman
- Nodemon

## Project Structure

```text
lab-03/
├── server.js
├── books.db
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
└── screenshots/
```

## Installation and Execution

1. Install the project dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Local server URL:

[http://localhost:3000/](http://localhost:3000/)

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Retrieve all books |
| GET | `/books/:id/` | Retrieve a book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/:id/` | Update an existing book |
| DELETE | `/books/:id/` | Delete a book |

## Query Parameters

The GET `/books/` endpoint supports:

| Parameter | Description | Example |
|---|---|---|
| `search_q` | Search books by partial title | `search_q=Atomic` |
| `order_by` | Select sorting column | `order_by=price` |
| `order` | Sorting order | `order=DESC` |
| `limit` | Maximum number of records | `limit=5` |
| `offset` | Number of records to skip | `offset=5` |
| `min_price` | Minimum book price | `min_price=300` |
| `max_price` | Maximum book price | `max_price=500` |

### Example Requests

Search:

```text
GET /books/?search_q=Atomic
```

Sort by price:

```text
GET /books/?order_by=price&order=DESC
```

Pagination:

```text
GET /books/?limit=3&offset=3
```

Filter by price:

```text
GET /books/?min_price=300&max_price=450
```

Combined filters:

```text
GET /books/?search_q=The&order_by=price&order=ASC&limit=5&offset=0&min_price=250&max_price=500
```

## Input Validation

The POST endpoint validates:

- Title must be provided and cannot be empty.
- Author must be provided and cannot be empty.
- Price must be a valid numeric value.

Invalid input returns `400 Bad Request` with a clear JSON message.

## HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Book created successfully |
| 400 | Invalid input or query parameters |
| 404 | Book not found |
| 500 | Internal server error |

## Database

The application uses SQLite with a `book` table containing:

- id
- title
- author
- price
- pages

SQL queries use parameterized values to help prevent SQL injection.

## Postman Testing

The API was tested using Postman for:

1. Retrieving all books.
2. Searching books by title.
3. Sorting books by price.
4. Pagination using limit and offset.
5. Filtering books by price range.
6. Combining multiple query parameters.
7. Validating missing title and author.
8. Validating non-numeric price.
9. Creating a book successfully.
10. Updating existing and non-existing books.
11. Deleting existing and non-existing books.
12. Retrieving a non-existing book.

## Screenshots

Postman testing screenshots are available in the `screenshots/` folder.

## Learning Outcomes

- Understood REST API design principles.
- Implemented query parameters for search, sorting and filtering.
- Implemented pagination.
- Applied input validation.
- Used appropriate HTTP status codes.
- Tested API endpoints using Postman.
- Practised debugging common backend errors.