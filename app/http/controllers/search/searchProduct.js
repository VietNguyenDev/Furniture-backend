const { abort } = require('../../../helpers/error');
const searchService = require('../../services/search');

async function searchProduct(req, res) {
  try {
    const { keyword, typeCategory } = req.query;
    const data = await searchService.searchProductByName({
      keyword,
      typeCategory,
    });
    if (data) {
      return res.status(200).send({
        message: 'Search product success',
        data,
      });
    }
  } catch (error) {
    abort(error.status, error.message);
  }
}

module.exports = searchProduct;
