const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');

const { monogURL, port } = require('./config/keys');
const orderRouter = require('./routes/order');
const userAuthRouter = require('./routes/auth/user');
const adminAuthRouter = require('./routes/auth/admin');

mongoose.connect(monogURL, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Mongoose connected');
    // Connect middlewares
    app.use(express.json()); // for parsing application/json
    app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(passport.initialize()); // initialize passport
    require('./config/passportConfig')(passport); // configure passport

    // connect routes
    app.use('/order', orderRouter);
    app.use('/auth/user', userAuthRouter);
    app.use('/auth/admin', adminAuthRouter);

    app.listen(port, () => {
      console.log('App up and running at port: ' + port);
    });
  }
});
