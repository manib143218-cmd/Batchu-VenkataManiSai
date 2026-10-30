const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();
app.use(express.json());

const dbPath = "./books.db";
const PORT = process.env.PORT || 3000;

let db = null;

// GET all books
app.get("/books/", async (request, response) => {
    try {
        const books = await db.all("SELECT * FROM book");
        response.status(200).send(books);
    } catch (error) {
        response.status(500).send({ error: error.message });
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
            response.status(404).send({ error: "Book not found" });
        } else {
            response.status(200).send(book);
        }
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});

// POST a new book
app.post("/books/", async (request, response) => {
    try {
        const { title, author, price, pages } = request.body;

        const query = `
            INSERT INTO book (title, author, price, pages)
            VALUES (?, ?, ?, ?)
        `;

        const result = await db.run(query, [
            title,
            author,
            price,
            pages
        ]);

        response.status(201).send({
            message: "Book added successfully",
            bookId: result.lastID
        });
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});

// PUT update a book
app.put("/books/:bookId/", async (request, response) => {
    try {
        const { bookId } = request.params;
        const { title, author, price, pages } = request.body;

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
            response.status(404).send({ error: "Book not found" });
        } else {
            response.status(200).send({
                message: "Book updated successfully"
            });
        }
    } catch (error) {
        response.status(500).send({ error: error.message });
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
            response.status(404).send({ error: "Book not found" });
        } else {
            response.status(200).send({
                message: "Book deleted successfully"
            });
        }
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});

const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
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