import express from "express";
import cors from "cors";
import FileUpload from "express-fileupload";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoutes.js";
import ProductRoute from "./routes/ProductRoutes.js";
import AuthRoute from "./routes/AuthRoutes.js";
import FriendRoute from './routes/FriendRoutes.js'
import MessageRoute from './routes/MessageRoutes.js'
import db from "./config/DataBase.js";


dotenv.config();

const app = express();

// (async () => {
//   await db.sync();
// })();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(FileUpload())
app.use(express.json());
app.use(express.static("public"))
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(FriendRoute);
app.use(MessageRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server Up and Listening to Port ${process.env.APP_PORT}`);
});
