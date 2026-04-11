const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ─── REGISTER ───────────────────────────────────────────────
exports.register = async (req, res) => {
  const { name, email, password, mobile_num, city, role } = req.body;

  if (!name || !email || !password || !mobile_num || !city || !role) {
    return res.status(400).json({ message: "Please fill all fields." });
  }

  try {
    // Check if email already exists
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) return res.status(500).json({ message: "Database error.", error: err });

        if (results.length > 0) {
          return res.status(409).json({ message: "Email already registered." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        db.query(
          "INSERT INTO users (name, email, password, mobile_num, city, role) VALUES (?, ?, ?, ?, ?, ?)",
          [name, email, hashedPassword, mobile_num, city, role],
          (err, result) => {
            if (err) return res.status(500).json({ message: "Registration failed.", error: err });
            return res.status(201).json({ message: "Registration successful!" });
          }
        );
      }
    );
  } catch (err) {
    return res.status(500).json({ message: "Server error.", error: err });
  }
};

// ─── LOGIN ───────────────────────────────────────────────────
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields." });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error.", error: err });

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found." });
      }

      const user = results[0];

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password." });
      }

      // Create JWT token
      const token = jwt.sign(
        { userid: user.userid, name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "Login successful!",
        token,
        user: {
          userid: user.userid,
          name: user.name,
          email: user.email,
          mobile_num: user.mobile_num,
          city: user.city,
          role: user.role,
        },
      });
    }
  );
};

// ─── GET PROFILE ─────────────────────────────────────────────
exports.getProfile = (req, res) => {
  const userid = req.user.userid;

  db.query(
    "SELECT userid, name, email, mobile_num, city, role, register_date FROM users WHERE userid = ?",
    [userid],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error.", error: err });
      if (results.length === 0) return res.status(404).json({ message: "User not found." });
      return res.status(200).json(results[0]);
    }
  );
};

// ─── UPDATE PROFILE ───────────────────────────────────────────
exports.updateProfile = (req, res) => {
  const userid = req.user.userid;
  const { name, mobile_num, city } = req.body;

  db.query(
    "UPDATE users SET name = ?, mobile_num = ?, city = ? WHERE userid = ?",
    [name, mobile_num, city, userid],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Update failed.", error: err });
      return res.status(200).json({ message: "Profile updated successfully!" });
    }
  );
};