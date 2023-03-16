const Joi = require('joi');

const productService = require('../../services/product');
const { abort } = require('../../../helpers/error');
const convertToSlug = require('../../../utils/common');
const { uploadImage } = require('../../../config/cloudinary');

async function validation({
  productName,
  productSlug,
  productCode,
  productSize,
  productColor,
  discountPrice,
  sellingPrice,
  productDescription,
  categoryId,
  productThumbnail,
  product3DModelPath,
  productImg,
}) {
  try {
    const schema = Joi.object().keys({
      productName: Joi.string(),
      productSlug: Joi.string(),
      categoryId: Joi.number().integer().min(0),
      productCode: Joi.string(),
      productSize: Joi.string(),
      productColor: Joi.string(),
      sellingPrice: Joi.number().min(0),
      discountPrice: Joi.number().min(0),
      productDescription: Joi.string(),
      productThumbnail: Joi.string(),
      product3DModelPath: Joi.string(),
      productImg: Joi.string(),
    });

    return await schema.validateAsync({
      productName,
      productSlug,
      productCode,
      productSize,
      productColor,
      discountPrice,
      sellingPrice,
      productDescription,
      categoryId,
      productThumbnail,
      product3DModelPath,
      productImg
    });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function create(req, res) {
  try {
    const params = req.body;
    const productFileName = req.file.filename;
    const productFilePath = req.file.path;
    const productSlug = convertToSlug(params.productName);
    const result = await uploadImage(productFilePath, productFileName);
    await validation({ ...params, productSlug, productImg: result.secure_url });
    const data = await productService.create({ ...params, productImg: result.secure_url, productSlug });
    if (data) {
      return res.status(200).send({
        message: 'Create product success',
        data,
      });
      
    }
  } catch (error) {
    abort(error.status, error.message);
  }
}

module.exports = create;
