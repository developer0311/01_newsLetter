import pg from "pg";
import "dotenv/config";
import path from "path";
import fs from "fs";

// ====================== DATABASE CONNECTION ====================== //
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

// ====================== CREATE POST ====================== //
export async function createPost(req, res) {
  try {
    const { title, written_by, content, section } = req.body;

    let imageUrl = null;

    if (req.file) {
      // Assuming you're using multer for file upload middleware
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const query = `
      INSERT INTO posts (title, written_by, content, section, image_url, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING id
    `;

    const values = [title, written_by, content, section, imageUrl];

    const result = await db.query(query, values);

    res.redirect("/admin/post/new"); // or wherever you want to redirect
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).send("Error creating post");
  }
}

// ====================== UPDATE POST ====================== //
export async function updatePost(req, res) {
  try {
    const { title, written_by, content, section } = req.body;
    const id = req.params.id; // FIXED

    let imageUrl = null;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const query = `
      UPDATE posts
      SET title = $1,
          written_by = $2,
          content = $3,
          section = $4,
          ${imageUrl ? "image_url = $5," : ""}
          updated_at = NOW()
      WHERE id = $${imageUrl ? 6 : 5}
    `;

    const values = imageUrl
      ? [title, written_by, content, section, imageUrl, id]
      : [title, written_by, content, section, id];

    await db.query(query, values);

    res.redirect(`/admin/post/edit/${id}`);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).send("Error updating post");
  }
}

