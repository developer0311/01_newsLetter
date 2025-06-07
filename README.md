
# Newsletter Project

## Description

The Newsletter Project is a web application designed to allow users to subscribe to a newsletter. This project allows for easy management of user subscriptions, sending of newsletters, and viewing subscription lists. The goal of this project is to provide a platform for businesses, bloggers, or content creators to engage with their audience through email newsletters.

---

## Features

* **User Subscription**: Users can easily subscribe to the newsletter using a simple form.
* **Subscription Management**: Admin can view, edit, or delete user subscriptions.
* **Responsive Design**: The app is fully responsive, providing a good user experience on both mobile and desktop devices.

---

## Technologies Used

* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL (or your preferred database)
* **Frontend**: HTML, CSS, JavaScript, Bootstrap
* **Authentication**: bcrypt

---

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/developer0311/01_newsLetter
   ```

2. Navigate to the project folder:

   ```bash
   cd 01_newsLetter
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your environment variables (e.g., for email service and database credentials) in a `.env` file.

   Example `.env`:

   ```
    SERVER_PORT=3000
    ADMIN_PASSWORD=

    # ------------------------- DATABASE -------------------------

    DB_USER="postgres"
    DB_HOST="localhost"
    DB_NAME="01_newsLetter"
    DB_PASSWORD=
    DB_PORT=5432
   ```

5. Run the application:

   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000` to view the app.

---

## Usage

* **Subscribe**: To subscribe to the newsletter, visit the subscription page, enter your email address, and click the "Subscribe" button.
* **Admin Dashboard**: Admins can log in to manage subscriptions, view email lists, and send newsletters.
* **Send Newsletter**: Once logged in as an admin, you can compose and send a newsletter to all active subscribers.

---

## Contributing

If you would like to contribute to the project, feel free to fork the repository and create a pull request with your changes. Please make sure to follow the coding standards and add tests for any new features.

---

## License

This project is licensed under the `MIT License`.

---

## Acknowledgements

* Bootstrap for the responsive design.

