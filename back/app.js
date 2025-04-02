const express = require('express');
const cors = require('cors');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');
const http = require('http');

const usersRouter = require('./src/routes/api/usersRouter');
const commentRouter = require('./src/routes/api/commentRouter');

const { db } = require('./src/db/index.js');
const app = express();

app.use(
  cors({
    origin: [],
  })
);

app.use(express.json());

app.use(express.static('public'));

app.use('/api/user', usersRouter);
app.use('/api/comment', commentRouter);

app.use(
  '/',
  expressStaticGzip(path.join(process.cwd(), 'front', 'build'), {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
  })
);

app.get(/^(?!\/documents)/, (req, res, next) => {
  res.sendFile(path.join(process.cwd(), 'front', 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

const PORT = process.env.PORT;

const succesMessage = app.get('env') + ` server is running on port :${PORT}`;
const errorMessage = app.get('env') + ` server is not running. Error: `;

db.then(() => {
  http.createServer(app).listen(PORT, async () => {
    console.log(succesMessage);
  });
}).catch((err) => {
  console.log(errorMessage, err.message);
});
