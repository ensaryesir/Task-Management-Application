const AuthModel = require("../models/auth-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const saltRounds = 10;

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

function sendPasswordResetEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // E.g., "Gmail"
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "workstack.info1@gmail.com",
      pass: "gnvclhhuasqdtsmf",
    },
  });

  const mailOptions = {
    from: "workstack.info1@gmail.com",
    to: email,
    subject: "Password Reset for '" + email + "'",
    text: `To reset your password, click the following link: http://localhost:7000/reset-password?token=${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Password reset email sent:", info.response);
    }
  });
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Find the user by email
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    // Update the resetToken field
    user.resetToken = resetToken;
    // Örneğin, forgotPassword fonksiyonunda:
    req.session.resetEmail = email;

    await user.save();

    // Send the password reset email
    sendPasswordResetEmail(email, resetToken);

    res.send("Password reset link sent to your email.");
  } catch (err) {
    console.error("Error during password reset:", err);
    res.status(500).json({ error: "An error occurred during password reset." });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword, email } = req.body;

    // Eğer email yoksa hata dön
    if (!email) {
      return res.status(400).json({ error: "Invalid email." });
    }

    // Kullanıcıyı email ile veritabanında bul
    const user = await AuthModel.findOne({ email, resetToken: token });

    // Eğer kullanıcı bulunamazsa hata dön
    if (!user) {
      return res.status(400).json({ error: "Invalid email or token." });
    }

    // Şifreleme işlemine geçmeden önce gelen veriyi kontrol et
    if (
      !password ||
      typeof password !== "string" ||
      password !== confirmPassword
    ) {
      return res.status(400).json({ error: "Invalid passwords." });
    }

    // Yeni şifre şifreleme ve güncelleme
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    user.resetToken = null; // Tokeni kullanıldı olarak işaretle

    await user.save();

    // Oturum verisini ayarla (örneğin, "resetEmail" adında)
    req.session.resetEmail = email; // Formdan gelen email değerini kullan

    res.redirect("/login");
  } catch (err) {
    console.error("Error during password reset:", err);
    res.status(500).json({ error: "An error occurred during password reset." });
  }
};
