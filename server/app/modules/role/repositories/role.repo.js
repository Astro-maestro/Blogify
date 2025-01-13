const Role = require('../models/role.model');


class RoleRepository{
    async createRole(data) {
        try {
          const role = new Role(data);
          return await role.save();
        } catch (error) {
          throw new Error("Failed to create role: " + error.message);
        }
      }
    
      // Get a category by ID
      async getRoleById(id) {
        try {
          const role = await Role.findById(id);
          if (!role) throw new Error("Role not found");
          return role;
        } catch (error) {
          throw new Error("Failed to retrieve role: " + error.message);
        }
      }
    
      // Update a category by ID
      async updateRole(id, data) {
        try {
          const updatedRole = await Role.findByIdAndUpdate(
            id,
            data,
            { new: true } // Return the updated document
          );
          if (!updatedRole) throw new Error("Role not found");
          return updatedRole;
        } catch (error) {
          throw new Error("Failed to update role: " + error.message);
        }
      }
    
      // Delete a category by ID
      async deleteRole(id) {
        try {
          const deletedRole = await Role.findByIdAndDelete(id);
          if (!deletedRole) throw new Error("Role not found");
          return deletedRole;
        } catch (error) {
          throw new Error("Failed to delete role: " + error.message);
        }
      }
    
      async getAllRoles() {
        try {
          return await Role.find(); 
        } catch (error) {
          throw new Error("Failed to retrieve roles: " + error.message);
        }
      }

      async activateRole(id) {
        try {
          const updatedRole = await Role.findByIdAndUpdate(
            id,
            { isActive: true },
            { new: true } // Return the updated document
          );
          if (!updatedRole) throw new Error("Role not found");
          return updatedRole;
        } catch (error) {
          throw new Error("Failed to activate role: " + error.message);
        }
      }

      async deactivateRole(id) {
        try {
          const updatedRole = await Role.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true } // Return the updated document
          );
          if (!updatedRole) throw new Error("Role not found");
          return updatedRole;
        } catch (error) {
          throw new Error("Failed to deactivate role: " + error.message);
        }
      }

}

module.exports = new RoleRepository();