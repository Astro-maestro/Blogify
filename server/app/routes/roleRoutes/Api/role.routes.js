const express = require('express');
const router = express.Router();
const RoleController = require('../../../modules/role/controllers/api/role.controller')

router.post('/createRole', RoleController.createRole);
router.post('/updateRole/:id', RoleController.updateRole);
router.post('/deleteRole/:id', RoleController.deleteRole);
router.post('/activateRole/:id', RoleController.activateRole);
router.post('/deactivateRole/:id', RoleController.deactivateRole);
router.get('/getAllRoles', RoleController.getAllRoles);
router.get('/getRole/:id', RoleController.getRoleById);

module.exports = router;