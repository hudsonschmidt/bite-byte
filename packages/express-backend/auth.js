import bcrypt from "bcrypt";
import User from "./models/user.js"; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

export function registerUser(req, res) {
  const { username, pwd } = req.body; // from form

  if (!username || !pwd) {
    return res.status(400).send("Bad request: Invalid input data.");
  }

  User.findOne({ username })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(409).send("Username already taken");
      }

      return bcrypt.genSalt(10)
        .then((salt) => bcrypt.hash(pwd, salt))
        .then((hashedPassword) => {
          const newUser = new User({ username, password: hashedPassword });
          return newUser.save();
        })
        .then((newUser) => {
          return generateAccessToken(newUser._id).then((token) => {
            res.status(201).json({ token });
          });
        });
    })
    .catch((error) => {
      res.status(500).send("Internal server error");
    });
}

function generateAccessToken(userId) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { userId: userId },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("No token received");
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    if (error) {
      console.error("JWT error:", error);
      return res.status(401).send("Unauthorized: Invalid token");
    }

    User.findById(decoded.userId)
      .then((user) => {
        if (!user) {
          return res.status(401).send("Unauthorized: User not found");
        }
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          req.user = decoded;
          next();
        } catch (err) {
          console.error('JWT error:', err.message);
          return res.status(500).json({ error: 'Internal server error' });
        }
      })
  });
}



export function loginUser(req, res) {
    const { username, pwd } = req.body; // from form
  
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          return res.status(401).send("Unauthorized: Invalid username");
        }
  
        return bcrypt.compare(pwd, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              return res.status(401).send("Unauthorized: Invalid password");
            }
  
            return generateAccessToken(user._id).then((token) => {
              res.status(200).json({ token });
            });
          });
      })
      .catch((error) => {
        res.status(500).send("Internal server error");
      });
  }