const userService = require('../../services/user');

async function deleteUserController(req, res) {
    const {id} = req.params;
    await deleteUser({id});

    return res.status(200).send({ message: "User  deleted successfully" })
}

module.exports = deleteUserController;