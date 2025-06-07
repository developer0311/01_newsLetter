-- =================================== ADMIN TABLE =================================== --

CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- =================================== SUBSCRIBERS TABLE =================================== --

CREATE TABLE subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =================================== POSTS TABLE =================================== --

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL, -- HTML from WYSIWYG editor
    image_url TEXT, -- Optional cover image
    section VARCHAR(255), -- Optional section like 'Blog', 'Tutorial', 'News', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    written_by VARCHAR(255) -- Name of the author for easy reference
);

-- =================================== POST_IMAGES TABLE =================================== --

CREATE TABLE post_images (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




-- Insert Post 1
INSERT INTO posts (title, content, image_url, section, created_at, updated_at, written_by)
VALUES 
('The Future of Web Development', 
 'Web development is an ever-evolving field, with new frameworks, tools, and technologies emerging constantly. In this post, we explore the future of web development, including the rise of serverless architecture, AI integration, and progressive web apps (PWAs).', 
 'https://via.placeholder.com/800x400.png', 
 'Blog', 
 NOW(), 
 NOW(),
 'Admin Name');  -- Replace with actual author name

-- Insert Post 2
INSERT INTO posts (title, content, image_url, section, created_at, updated_at, written_by)
VALUES 
('Understanding Artificial Intelligence', 
 'Artificial intelligence (AI) is transforming industries across the globe. From healthcare to finance, AI is making processes smarter and more efficient. This post provides an overview of AI, including its key concepts, applications, and challenges.', 
 'https://via.placeholder.com/800x400.png', 
 'News', 
 NOW(), 
 NOW(),
 'Admin Name');  -- Replace with actual author name

-- Insert Post 3
INSERT INTO posts (title, content, image_url, section, created_at, updated_at, written_by)
VALUES 
('How to Stay Productive as a Remote Worker', 
 'Remote work has become the norm for many professionals. In this post, we share tips and strategies to help you stay productive, maintain a work-life balance, and avoid burnout while working from home.', 
 'https://via.placeholder.com/800x400.png', 
 'Blog', 
 NOW(), 
 NOW(),
 'Admin Name');  -- Replace with actual author name

-- Insert Post 4
INSERT INTO posts (title, content, image_url, section, created_at, updated_at, written_by)
VALUES 
('The Power of Data Analytics in Business', 
 'Data analytics is revolutionizing how businesses make decisions. This post dives into the importance of data-driven decision-making, the types of data analytics, and how businesses can leverage these tools to improve performance.', 
 'https://via.placeholder.com/800x400.png', 
 'Tutorial', 
 NOW(), 
 NOW(),
 'Admin Name');  -- Replace with actual author name

-- Insert Post 5
INSERT INTO posts (title, content, image_url, section, created_at, updated_at, written_by)
VALUES 
('10 Must-Know JavaScript Tips for Developers', 
 'JavaScript is one of the most popular programming languages in the world, and mastering it can open doors to many development opportunities. Here are 10 essential JavaScript tips every developer should know to improve their code quality and productivity.', 
 'https://via.placeholder.com/800x400.png', 
 'Blog', 
 NOW(), 
 NOW(),
 'Admin Name');  -- Replace with actual author name
