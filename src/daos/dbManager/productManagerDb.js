import { productModel } from "../../models/products.models.js";


class ProductDao {
  async addProduct(data) {
    return await productModel.create(data);
  }
  async getProducts(query, sort, page, limit) {
    return await productModel.paginate(
      { query },
      { sort: { price: sort }, page: page || 1, limit: limit || 10 }
    );
  }
  async getProductById(id) {
    return await productModel.findById(id);
  }
  async deleteProduct(id) {
    return await productModel.findByIdAndDelete(id);
  }
  async updateProduct(id, data) {
    return await productModel.findByIdAndUpdate(id, data, { new: true });
  }
}

const productDao = new ProductDao();
export default productDao;
