const { abort } = require('../../../helpers/error');
const { getAllOrdersByUserId } = require('../../services/orders');

async function getAllByUserId(req, res) {
  try {
    const { page, limit, sortBy, userId } = req.query;
    const data = await getAllOrdersByUserId({
      page,
      limit,
      sortBy,
      userId,
    });
    return res.status(200).send({
      data,
      message: 'Get all orders successfully',
    });
  } catch (error) {
    abort(error.status, error.message);
  }
}

module.exports = getAllByUserId;
