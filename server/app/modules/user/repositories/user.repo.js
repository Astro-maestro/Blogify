const User = require("../models/user.model");
const Category = require("../../category/models/category.model");
const Subcategory = require("../../subcategory/models/subcategory.model");
const Product = require("../../product/models/product.model");
const bcrypt = require("bcryptjs");

class UserRepository {
  // Register a new user with an optional image URL
  async register({ name, email, password, role, file }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const image = file
        ? `/uploads/${file.filename}`
        : "https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg";
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        image, // Save image URL
      });
      return await newUser.save();
    } catch (error) {
      throw new Error("Registration failed: " + error.message);
    }
  }

  // Login a user
  async login(email) {
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid credentials"); // Avoid exposing details for security
      }

      return user; // Return user if found
    } catch (error) {
      throw new Error("Login failed: " + error.message);
    }
  }

  // Update a user’s password
  async updatePassword(userId, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const user = await User.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true }
      );
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Password update failed: " + error.message);
    }
  }

  async updateProfile(userId, name, password, file) {
    try {
      // Prepare the update fields
      const updateFields = { name };

      // Hash and add password if provided
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.password = hashedPassword;
      }

      // Add the image field
      if (file) {
        updateFields.image = `/uploads/${file.filename}`;
      }

      // Perform the update
      const user = await User.findByIdAndUpdate(userId, updateFields, {
        new: true,
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw new Error("Profile update failed: " + error.message);
    }
  }

  // Fetch user data for dashboard view
  async getUserDashboard(userId) {
    try {
      const user = await User.findById(userId, "name email role image");
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error fetching user data: " + error.message);
    }
  }

  async findUser(email) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error fetching user data: " + error.message);
    }
  }

  async findUserByEmailAndId(email, userId) {
    try {
      const user = await User.findOne({ email, _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error fetching user data: " + error.message);
    }
  }

  async updateVerificationStatus(userId, isVerified = true) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { isVerified }, // Update the isVerified field
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        throw new Error("User not found");
      }

      return updatedUser;
    } catch (error) {
      throw new Error("Verification status update failed: " + error.message);
    }
  }

  async updateActivationStatus(userId, isActive) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { isActive }, // Update the isVerified field
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        throw new Error("User not found");
      }

      return updatedUser;
    } catch (error) {
      throw new Error("Activation status update failed: " + error.message);
    }
  }

  // Placeholder for logout (token management can be handled on the client side or with server-side blacklisting)
  async logout(userId) {
    try {
      return { message: "User logged out successfully", userId };
    } catch (error) {
      throw new Error("Logout failed: " + error.message);
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find();
      if (!users) {
        throw new Error("No users found");
      }
      return users;
    } catch (error) {
      throw new Error("Failed to fetch all users!" + error.message);
    }
  }

  async getRoleBasedUsers(role) {
    try {
      const users = await User.find({ role: role });
      if (!users) {
        throw new Error("No users found");
      }
      return users;
    } catch (error) {
      throw new Error("Failed to fetch users based on role!" + error.message);
    }
  }

  async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return { message: "User deleted successfully", userId };
    } catch (error) {
      throw new Error("Failed to delete user!" + error.message);
    }
  }

  async activateUser(userId) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { isActive: true },
        { new: true }
      );
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Failed to activate user!" + error.message);
    }
  }

  async deactivateUser(userId) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { isActive: false },
        { new: true }
      );
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Failed to deactivate user!" + error.message);
    }
  }

  async updateUser(userId, name, role, file) {
    try {
      const updateFields = { name, role };

      // Add the image field
      if (file) {
        updateFields.image = `/uploads/${file.filename}`;
      }

      // Perform the update
      const user = await User.findByIdAndUpdate(userId, updateFields, {
        new: true,
      });

      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Failed to update user!" + error.message);
    }
  }

  async getTotalCategoryCount(){
    try {
      const categoryCount = await Category.countDocuments();
      return categoryCount;
    } catch (error) {
      throw new Error("Failed to fetch total category count!" + error.message);
    }
  }

  async getTotalSubcategoryCount(){
    try {
      const subcategoryCount = await Subcategory.countDocuments();
      return subcategoryCount;
    } catch (error) {
      throw new Error("Failed to fetch total subcategory count!" + error.message);
    }
  }

  async getTotalProductCount(){
    try {
      const productCount = await Product.countDocuments();
      return productCount;
    } catch (error) {
      throw new Error("Failed to fetch total product count!" + error.message);
    }
  }
}

module.exports = new UserRepository();
