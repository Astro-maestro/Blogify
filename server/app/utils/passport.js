const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../modules/user/models/user.model");
const Role = require("../modules/role/models/role.model");
const Token = require('../modules/user/models/token.model');
const jwt = require("jsonwebtoken");
// Define the setup function to avoid naming conflicts
const setupPassport = (app) => {
  // Configure session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET, // Use the secret from .env file
      resave: false, // Don't save session if unmodified
      saveUninitialized: false, // Don't create a session until something is stored
      cookie: {
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      },
    })
  );

  // Initialize Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"], // Replace with your callback URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(accessToken);
          console.log(refreshToken);
          console.log("profile:", profile);
          console.log("profileId:", profile.id);

          // Find existing user by googleId
          const existingUser = await User.findOne({ googleId: profile.id });

          if (existingUser) {
            console.log(
              "User already exists with this Google ID:",
              existingUser
            );
            return done(null, existingUser, { redirect: 'http://localhost:3000/' }); // Return the existing user
          }

          const employeeRole = await Role.findOne({ name: "Employee" });
          if (!employeeRole) {
            throw new Error('Employee role not found in the database');
          }

          // Create a new user if not found
          console.log("Creating a new Google user...");
          const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0]?.value,
            image:
              profile.photos[0]?.value ||
              "https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg",
            role: employeeRole._id,
            authProvider: "google",
            isVerified: true,
          });

          console.log(newUser);

          // Save the new user
          const savedUser = await newUser.save();
          console.log("New user saved:", savedUser);
          const tokenString = jwt.sign(
            {
              userId: savedUser._id,
              name: savedUser.name,
              email: savedUser.email,
              role: savedUser.role,
            },
            process.env.JWT_SECRET,
          );
    
          // Save the token to the database for session management
          const token = new Token({
            _userId: savedUser._id,
            token: tokenString,
            name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role,
          });
          await token.save();

          console.log('savedToken:', token);

          // Return the new user
          return done(null, savedUser);

        } catch (error) {
          console.error("Error in Google Strategy:", error);
          return done( null, false, { redirect: `http://localhost:3000/`});
        }
      }
    )
  );

  // Serialize user information into the session
  passport.serializeUser((user, done) => {
    console.log("Serializing user:", user);
    done(null, user.id); // Store only the user ID in the session
  });

  // Deserialize user information from the session
  passport.deserializeUser(async (user, done) => {
    console.log("Deserializing user", user);

    done(null, user);
  });
};

module.exports = setupPassport; // Use CommonJS export
