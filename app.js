const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const User = require("./models/user");

// const MONGODB_URI = 'mongodb://localhost:27017/test';
const MONGODB_URI =
  "mongodb+srv://victoredu96:3N4FCu1OonlGYH4B@cluster0-o9vpb.mongodb.net/test?retryWrites=true";


const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions"
});

const adminRoutes = require("./routes/admin");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(adminRoutes);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          username: "Luis",
          password: "12345",
          rol: {
            name: "admin"
          }
        });
        user.save((error) => {
          console.log(error)
        });
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
