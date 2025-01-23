# Task Management Application

A modern and user-friendly task management system that helps users organize, track, and manage their tasks effectively.

## 🚀 Features

- 👥 User Authentication (Login/Register)
- 🔑 Password Reset Functionality
- ✅ Task Creation and Management
- 🏷️ Task Categorization
- ⭐ Priority Management
- 📅 Due Date Tracking
- 📱 Responsive Design

## 🛠️ Technologies

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap
- **Database:** MongoDB
- **Authentication:** Session-based authentication
- **Template Engine:** EJS

## 📦 Dependencies

The project uses the following npm packages:

```json
{
    "body-parser": "^1.20.2",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "mongoose": "^7.4.1",
    "ejs": "^3.1.9",
    "nodemon": "^3.0.1",
    "dotenv": "^16.3.1"
}
```

These packages will be automatically installed with the `npm install` command.

## ⚙️ Installation Steps

### 1. Prerequisites Installation

#### MongoDB Setup
1. [Download MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Complete the installation
3. Open MongoDB Compass
4. Enter the following in the Connection URL field: `mongodb://localhost:27017`
5. Click "Connect"
6. Create a database named `TaskManagementApplicationDb`
7. Create collections and import data:
   - Import JSON files from `TaskManagementApplicationDb` folder
   - Create `auths` collection and import its data

#### Node.js Setup
1. [Download Node.js](https://nodejs.org/en/download/current)
2. Complete the installation
3. Verify installation by typing in terminal/cmd:
   ```bash
   node -v
   ```

### 2. Project Setup

1. Clone the project:
   ```bash
   git clone https://github.com/YourUsername/Task-Management-Application.git
   cd Task-Management-Application
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your settings

4. Start the application:
   ```bash
   npm start
   # or use nodemon for development
   nodemon app.js
   ```

5. Visit in your browser:
   ```
   http://localhost:7000/home
   ```

## 📝 Usage

1. Register a new account or login with existing credentials
2. Navigate to the dashboard to view your tasks
3. Use "Add Task" button to create new tasks
4. Set task priorities and due dates
5. Track and manage your tasks efficiently

## 🔧 Project Structure

```
├── TaskManagementApplicationDb/    # MongoDB collection data
├── photos_of_website/             # Website screenshots
├── public/                        # Static files
├── routes/                        # API routes
├── views/                         # Frontend views
├── app.js                         # Main application file
└── package.json                   # Project dependencies
```

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

## 📸 Screenshots

![Home](/photos_of_website/home1.png)
*Home Page*

![Home](/photos_of_website/home2.png)
*Features Section*

![Home](/photos_of_website/home3.png)
*About Section*

![Login](/photos_of_website/login.png)
*Login Page*

![Registration](/photos_of_website/registration.png)
*Registration Page*

![Forgot Password](/photos_of_website/forgot-password.png)
*Forgot Password Page*

![Reset Password](/photos_of_website/reset-password.png)
*Reset Password Page*
