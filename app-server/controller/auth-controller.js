const AuthModel = require("../models/auth-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

function generateJWT(user) {
  const secretKey = "secretKey"; // Set a secure key
  const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" }); // we are creating a valid token for 1 hour
  return token;
}

function verifyJWT(token) {
  const secretKey = "secretKey"; // We verify the token using the same secret key
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken.user;
  } catch (err) {
    return null; // If the token cannot be verified, we will return null
  }
}

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthModel.findOne({ email });

    console.log("User Object:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = generateJWT(user);
      res.cookie("token", token, { httpOnly: true });

      req.session.user = user;
      res.redirect("/index");
    } else {
      res.status(401).json({ error: "Invalid password." });
    }
  } catch (err) {
    console.error("Error during user login:", err);
    res
      .status(500)
      .json({ error: "An error occurred during the login process." });
  }
};

exports.userRegister = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await AuthModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "E-mail is already registered." });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new AuthModel({ email, name, password: hashedPassword });
    await newUser.save();

    const token = generateJWT(newUser);
    res.cookie("token", token, { httpOnly: true });

    req.session.user = newUser;
    res.redirect("/login");
  } catch (err) {
    console.error("Error during user registration:", err);
    res
      .status(500)
      .json({ error: "An error occurred during the registration process." });
  }
};

exports.logoutUser = (req, res) => {
  // If the user has the token, perform the logout process by invalidating the token
  if (req.cookies.token) {
    // Invalidate the token
    res.clearCookie("token");
    // When the logout process is successful, redirect to the home page
    res.redirect("/home");
  } else {
    //res.status(401).json({ error: "Unauthorized access." });
    res.redirect("/login");
  }
};

exports.showForgotPasswordPage = (req, res) => {
  res.render("view-home/home/forgot-password");
};

function generateResetToken() {
  const tokenLength = 32; // Token uzunluğu (karakter sayısı)
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let token = "";
  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
}

// Create a transporter using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail", // E-posta sağlayıcınıza uygun bir değer girin (örneğin "Gmail")
  auth: {
    user: "workstack.info@gmail.com", // Gönderici e-posta adresi
    pass: "$8f(9EBnM#:5{[@N", // Gönderici e-posta adresinin şifresi
  },
});

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a reset token and save it to the user's record in the database
    const resetToken = generateResetToken(); // Burada reset token üretme mantığını kullanmalısınız

    // Construct the reset link
    const resetLink = `http://localhost:7000/reset-password=${resetToken}`;
    console.log("Generated Reset Token:", resetToken);

    // Send the password reset email
    const mailOptions = {
      from: "workstack.info@gmail.com", // Gönderici e-posta adresi
      to: email, // Alıcı e-posta adresi
      subject: "Password Reset", // E-posta konusu
      text: `To reset your password, click the following link: ${resetLink}`, // E-posta içeriği
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res
          .status(500)
          .json({ error: "An error occurred while sending the email." });
      } else {
        console.log("Password reset email sent:", info.response);
        res
          .status(200)
          .json({ message: "Password reset email sent successfully." });
      }
    });
  } catch (err) {
    console.error("Error during password reset:", err);
    res.status(500).json({ error: "An error occurred during password reset." });
  }
};
