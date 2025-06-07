import bcrypt from "bcrypt";
import pg from "pg";



// DB Setup
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

// ====================== REGISTER ======================

export async function userRegister(req, res) {
  try {
    const { email, password, confirmPassword } = req.body;

    // Password Match Check
    if (password !== confirmPassword) {
      return res.redirect("/register?error=Passwords do not match");
    }

    // Check if the Email Already Exists
    const existingUser = await db.query("SELECT * FROM subscribers WHERE email = $1", [email]);
    if (existingUser.rowCount > 0) {
      return res.redirect("/register?error=Email already registered");
    }

    // Hash the Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the New User into Database
    await db.query(
      "INSERT INTO subscribers (email, password_hash, subscribed_at) VALUES ($1, $2, NOW())",
      [email, hashedPassword]
    );

    return res.redirect("/login?success=Registered successfully! Login to access.");
  } catch (err) {
    console.error(err);
    return res.redirect("/register?error=Something went wrong. Try again.");
  }
}

// ====================== LOGIN ======================

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Check for Admin Login
    const adminResult = await db.query("SELECT * FROM admins WHERE email = $1", [email]);
    if (adminResult.rowCount > 0) {
      const admin = adminResult.rows[0];
      const passwordMatch = await bcrypt.compare(password, admin.password_hash);

      if (!passwordMatch) {
        return res.redirect("/login?error=Incorrect password");
      }

      // Admin Session Setup
      req.session.admin = true;
      req.session.email = admin.email;
      req.session.adminId = admin.id;
      return res.redirect("/admin/dashboard");
    }

    // Check for Subscriber Login
    const subResult = await db.query("SELECT * FROM subscribers WHERE email = $1", [email]);
    if (subResult.rowCount === 0) {
      return res.redirect("/login?error=User not found");
    }

    const subscriber = subResult.rows[0];
    const passwordMatch = await bcrypt.compare(password, subscriber.password_hash);

    if (!passwordMatch) {
      return res.redirect("/login?error=Incorrect password");
    }

    // Subscriber Session Setup
    req.session.subscribed = true;
    req.session.email = subscriber.email;
    req.session.subscriberId = subscriber.id;

    return res.redirect("/news");
  } catch (err) {
    console.error(err);
    return res.redirect("/login?error=Login failed. Try again.");
  }
}


// ====================== LOGOUT ROUTE ======================

export function logout(req, res) {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Failed to log out");
    }
    // Redirect to the login page or homepage
    res.redirect("/login");  // Redirect to the login page after logout
  });
}
