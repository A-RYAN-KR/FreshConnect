const app = require('./app'); // Import the Express app
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware (applied before routes)
app.use(cors()); // Enable CORS for all routes
app.use(fileUpload({ useTempFiles: true })); // Enable file uploads

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});