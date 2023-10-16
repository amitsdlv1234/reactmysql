
import express  from 'express';
import mysql from "mysql2/promise";
// const mysql = require('mysql2/promise');

const app = express();

// Database connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Amit@1234',
    database: 'CRUD_APP',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Route to get users from the database
app.get('/api/users', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.execute('SELECT * FROM Student_Data');
        connection.release(); // Don't forget to release the connection when done
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 3000; // You can change the port number if needed
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
