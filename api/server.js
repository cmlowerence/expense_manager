// const express = require('express');
// const connectDB = require('./config/db');
// const logRoutes = require('./routes/logRoutes');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// connectDB();

// app.use(cors());
// app.use(express.json());
// app.use(logRoutes);

// app.listen(port, ()=>{
//   console.log(`Server running on port ${port}`);
// });

const express = require('express');
const connectDB = require('./config/db');
const logRoutes = require('./routes/logRoutes');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(logRoutes);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
