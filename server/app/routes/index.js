const express = require('express');
/* const userRouter = require('../routes/userRoutes/api/user.routes'); */
const roleRouter = require('../routes/roleRoutes/api/role.routes');

const router = express.Router();

/* router.use(userRouter); */
router.use(roleRouter);

module.exports = router;