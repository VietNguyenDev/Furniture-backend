/* eslint-disable consistent-return */
const { abort } = require('../../../helpers/error');
const userService = require('../../services/user');

async function resetPasswordUser(req) {
  try {
    const { id } = req.params;
    await userService.resetPasswordUser({ id });
    return abort(200, 'Reset password success');
  } catch (error) {
    abort(400, error.message);
  }
}

module.exports = resetPasswordUser;
