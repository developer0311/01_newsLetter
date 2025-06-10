import express from "express";
import {
  showHomePage,
  showRegisterPage,
  showLoginPage,
  showNewsPage,
  showPost,
  showAdminLoginPage,
  showAdminPostPage,
} from "../controllers/page_controllers.js";

const router = express.Router();

router.get("/", showHomePage);
router.get("/register", showRegisterPage);
router.get("/login", showLoginPage);
router.get("/news", showNewsPage);
router.get("/posts/:postId", showPost);
router.get("/admin/login", showAdminLoginPage);
router.get("/admin/post/new", showAdminPostPage);         // to create a new post
router.get("/admin/post/edit/:postId", showAdminPostPage); // to edit an existing one


export default router;
