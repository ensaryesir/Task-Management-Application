const AuthModel = require("../models/auth-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
