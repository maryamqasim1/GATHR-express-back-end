const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

require('./config/database');
const express = require('express');

// Auth
const verifyToken = require('./middleware/verify-token');
const isAdmin = require ('./middleware/is-admin.js');


// Controllers
const testJWTRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
const profilesRouter = require('./controllers/profiles');
const bookingsRouter = require('./controllers/bookings');
const eventsRouter = require('./controllers/events.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/test-jwt', testJWTRouter);
app.use('/users', usersRouter);
app.use('/profiles', verifyToken, profilesRouter);
app.use('/bookings', bookingsRouter);
app.use('/events', eventsRouter);

app.listen(PORT, () => {
  console.log('The express app is ready!');
});




