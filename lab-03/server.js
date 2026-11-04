
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();
app.use(express.json());

const dbPath = "./books.db";
const PORT = process.env.PORT || 3000;

let db = null;

// GET all books with search, sorting, pagination and price filtering
app.get("/books/", async (request, response) => {
    try {
        const {
            search_q = "",
            order_by = "id",
            order = "ASC",
            limit = "10",
            offset = "0",
            min_price,
            max_price
        } = request.query;

        // Validate search parameter
        if (typeof search_q !== "string") {
            return response.status(400).send({
                message: "search_q must be a string"
            });
        }

        // Validate sorting column
        const allowedColumns = ["id", "title", "author", "price", "pages"];

        if (
            typeof order_by !== "string" ||
            !allowedColumns.includes(order_by)
        ) {
            return response.status(400).send({
                message: "Invalid order_by column"
            });
        }

        // Validate sorting order
        if (typeof order !== "string") {
            return response.status(400).send({
                message: "Order must be ASC or DESC"
            });
        }

        const sortOrder = order.toUpperCase();

        if (!["ASC", "DESC"].includes(sortOrder)) {
            return response.status(400).send({
                message: "Order must be ASC or DESC"
            });
        }

        // Validate pagination
        const pageLimit = Number(limit);
        const pageOffset = Number(offset);

        if (
            !Number.isInteger(pageLimit) ||
            !Number.isInteger(pageOffset) ||
            pageLimit <= 0 ||
            pageOffset < 0
        ) {
            return response.status(400).send({
                message: "Limit must be positive and offset must be non-negative integers"
            });
        }

        // Build parameterized SQL query
        let query = "SELECT * FROM book WHERE title LIKE ?";
        const params = [`%${search_q}%`];

        // Minimum price filter
        if (min_price !== undefined) {
            const min = Number(min_price);

            if (!Number.isFinite(min) || min < 0) {
                return response.status(400).send({
                    message: "min_price must be a valid non-negative number"
                });
            }

            query += " AND price >= ?";
            params.push(min);
        }

        // Maximum price filter
        if (max_price !== undefined) {
            const max = Number(max_price);

            if (!Number.isFinite(max) || max < 0) {
                return response.status(400).send({
                    message: "max_price must be a valid non-negative number"
                });
            }

            query += " AND price <= ?";
            params.push(max);
        }

        // Validate price range
        if (
            min_price !== undefined &&
            max_price !== undefined &&
            Number(min_price) > Number(max_price)
        ) {
            return response.status(400).send({
                message: "min_price cannot be greater than max_price"
            });
        }

        // Sorting and pagination
        query += ` ORDER BY ${order_by} ${sortOrder} LIMIT ? OFFSET ?`;
        params.push(pageLimit, pageOffset);

        const books = await db.all(query, params);

        response.status(200).send(books);

    } catch (error) {
        response.status(500).send({
            message: "Internal server error"
        });
    }
});


// GET a single book
app.get("/books/:bookId/", async (request, response) => {
    try {
        const { bookId } = request.params;

        const book = await db.get(
            "SELECT * FROM book WHERE id = ?",
            [bookId]
        );

        if (book === undefined) {
            return response.status(404).send({
                message: "Book not found"
            });
        }

        response.status(200).send(book);

    } catch (error) {
        response.status(500).send({
            message: "Internal server error"
        });
    }
});


// POST a new book with validation
app.post("/books/", async (request, response) => {
    try {
        const { title, author, price, pages } = request.body || {};

        // Validate title
        if (
            typeof title !== "string" ||
            !title.trim()
        ) {
            return response.status(400).send({
                message: "Title is required"
            });
        }

        // Validate author
        if (
            typeof author !== "string" ||
            !author.trim()
        ) {
            return response.status(400).send({
                message: "Author is required"
            });
        }

        // Validate price
        if (
            typeof price !== "number" ||
            !Number.isFinite(price)
        ) {
            return response.status(400).send({
                message: "Price must be a valid number"
            });
        }

        const query = `
            INSERT INTO book (title, author, price, pages)
            VALUES (?, ?, ?, ?)
        `;

        const result = await db.run(query, [
            title.trim(),
            author.trim(),
            price,
            pages
        ]);

        response.status(201).send({
            message: "Book added successfully",
            bookId: result.lastID
        });

    } catch (error) {
        response.status(500).send({
            message: "Internal server error"
        });
    }
});


// PUT update a book
app.put("/books/:bookId/", async (request, response) => {
    try {
        const { bookId } = request.params;
        const { title, author, price, pages } = request.body || {};

        const query = `
            UPDATE book
            SET title = ?, author = ?, price = ?, pages = ?
            WHERE id = ?
        `;

        const result = await db.run(query, [
            title,
            author,
            price,
            pages,
            bookId
        ]);

        if (result.changes === 0) {
            return response.status(404).send({
                message: "Book not found"
            });
        }

        response.status(200).send({
            message: "Book updated successfully"
        });

    } catch (error) {
        response.status(500).send({
            message: "Internal server error"
        });
    }
});


// DELETE a book
app.delete("/books/:bookId/", async (request, response) => {
    try {
        const { bookId } = request.params;

        const result = await db.run(
            "DELETE FROM book WHERE id = ?",
            [bookId]
        );

        if (result.changes === 0) {
            return response.status(404).send({
                message: "Book not found"
            });
        }

        response.status(200).send({
            message: "Book deleted successfully"
        });

    } catch (error) {
        response.status(500).send({
            message: "Internal server error"
        });
    }
});


// Initialize database and start server
const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}/`);
        });

    } catch (error) {
        console.log(`Database Error: ${error.message}`);
        process.exit(1);
    }
};

initializeDBAndServer();
