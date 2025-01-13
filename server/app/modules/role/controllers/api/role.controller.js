const RoleRepository = require("../../repositories/role.repo");

class RoleController {
  // Create a new role
  async createRole(req, res) {
    try {
      const { name } = req.body;

      // Create the role
      const role = await RoleRepository.createRole({ name });
      res.status(201).json({ message: "Role created successfully", role });
    } catch (error) {
      res.status(500).json({ error: "Failed to create role: " + error.message });
    }
  }

  // Get a single role by ID
  async getRoleById(req, res) {
    try {
      const { id } = req.params;

      // Retrieve the role
      const role = await RoleRepository.getRoleById(id);
      res.status(200).json({ role });
    } catch (error) {
      res.status(404).json({ error: "Role not found: " + error.message });
    }
  }

  // Update a role by ID
  async updateRole(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      // Update the role
      const updatedRole = await RoleRepository.updateRole(id, { name });
      res
        .status(200)
        .json({ message: "Role updated successfully", role: updatedRole });
    } catch (error) {
      res.status(500).json({ error: "Failed to update role: " + error.message });
    }
  }

  // Delete a role by ID
  async deleteRole(req, res) {
    try {
      const { id } = req.params;

      // Delete the role
      await RoleRepository.deleteRole(id);
      res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete role: " + error.message });
    }
  }

  // Get all roles
  async getAllRoles(req, res) {
    try {
      const roles = await RoleRepository.getAllRoles();
      res.status(200).json({ roles });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to retrieve roles: " + error.message });
    }
  }

  // Activate a role
  async activateRole(req, res) {
    try {
      const { id } = req.params;

      // Activate the role
      const role = await RoleRepository.activateRole(id);
      res
        .status(200)
        .json({ message: "Role activated successfully", role });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to activate role: " + error.message });
    }
  }

  // Deactivate a role
  async deactivateRole(req, res) {
    try {
      const { id } = req.params;

      // Deactivate the role
      const role = await RoleRepository.deactivateRole(id);
      res
        .status(200)
        .json({ message: "Role deactivated successfully", role });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to deactivate role: " + error.message });
    }
  }
 
}

module.exports = new RoleController();
