import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import passport from "passport";
import "dotenv/config";
import helmet from "helmet";
import flash from "connect-flash";

import pageRoutes from "./routes/page_routes.js";
import authRoutes from "./routes/auth_routes.js";
import adminRoutes from "./routes/createPost_routes.js";




const app = express();
const port = process.env.SERVER_PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(helmet()); // adds common security headers

app.use(flash());



// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Session config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Page Routes
app.use("/", pageRoutes);


// Auth Routes
app.use("/auth", authRoutes)

// Admin Routes
app.use("/admin", adminRoutes)


app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.stack);
  res.status(500).render("500", { error: err }); // Or send text or JSON
});


export default app;
