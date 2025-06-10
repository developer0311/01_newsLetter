import passport from "passport";
import pg from "pg";
import "dotenv/config";

// ====================== DATABASE CONNECTION ====================== //

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

// ====================== PAGE CONTROLLERS ====================== //

// Home Page
export async function showHomePage(req, res) {
  try {
    res.render("index"); // Render the index page
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send("Error loading homepage"); // Send a generic error message
  }
}

// Register Page
export async function showRegisterPage(req, res) {
  try {
    // If the user is already authenticated, redirect them to the news page or any other page
    if (req.session.subscribed || req.session.admin) {
      return res.redirect("/news"); // Redirect to the page where authenticated users should go
    }

    const error = req.query.error; // Extract error message from query params
    res.render("register", { error }); // Render the register page
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send("Error loading register page"); // Send a generic error message
  }
}

// Login Page
export async function showLoginPage(req, res) {
  try {
    if (req.session.subscribed || req.session.admin) {
      return res.redirect("/news"); // Redirect to the page where authenticated users should go
    }
    const error = req.query.error; // Extract error message from query params
    const success = req.query.success; // Extract success message from query params
    res.render("login", { error, success });
  } catch (err) {
    res.status(500).send("Error loading login page");
  }
}

// News Page (Protected)
export async function showNewsPage(req, res) {
  try {
    if (!req.session.subscribed) {
      return res.redirect("/register");
    }
    // Fetch posts and render the news page
    const result = await db.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    const posts = result.rows;
    res.render("news", { posts });
  } catch (err) {
    res.status(500).send("Error loading news posts");
  }
}

export async function showPost(req, res) {
  const postId = req.params.postId;

  try {
    if (!req.session.subscribed) {
      return res.redirect("/register");
    }
    const result = await db.query("SELECT * FROM posts WHERE id = $1", [postId]);

    if (result.rows.length === 0) {
      return res.status(404).render("404", { message: "Post not found" });
    }

    const post = result.rows[0];

    res.render("post", { post });
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).send("Server error");
  }
}

// Admin Login Page
export async function showAdminLoginPage(req, res) {
  try {
    res.render("admin_login");
  } catch (err) {
    res.status(500).send("Error loading admin login page");
  }
}

// Admin New or Edit Post Page
export async function showAdminPostPage(req, res) {
  try {
    const { postId } = req.params;

    if (postId) {
      // Editing an existing post
      const result = await db.query("SELECT * FROM posts WHERE id = $1", [
        postId,
      ]);

      if (result.rowCount === 0) {
        return res.status(404).send("Post not found");
      }

      const post = result.rows[0];
      res.render("admin_edit_post", { post });
    } else {
      // Creating a new post
      res.render("admin_edit_post", { post: null });
    }
  } catch (err) {
    res.status(500).send("Error loading post editor");
  }
}
