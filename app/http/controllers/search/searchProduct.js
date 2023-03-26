const { abort } = require('../../../helpers/error');
const searchService = require('../../services/search');

exports.searchProduct = async (req, res) => {
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
    console.log(error);
    abort(error.status, error.message);
  }
};
