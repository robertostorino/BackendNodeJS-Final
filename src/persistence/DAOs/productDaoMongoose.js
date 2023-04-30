import moment from "moment";
// import { config as configRoot } from "../../constants/config.js";
import config from "../../config/config.js";
import { transformToDto } from "../DTOs/productDto.js";

export class DaoProduct {
    constructor(model) {
        this.model = model
    }

    getAllProducts = async () => {
        let productos = await this.model.find({}, { __v: 0, _id: 0 }).lean();
        if (!productos.length) {
            const response = {
                error: 1,
                message: `Not products found`
            }
            return response;
        } else {
            return transformToDto(productos);
        }
    }

    getProduct = async (id) => {
        try {
            let product = await this.model.find({ id: id.toString() }, { __v: 0 });
            return transformToDto(product)
        } catch (error) {
            return false;
        }
    }

    saveProduct = async (data) => {
        try {
            let last = await this.model.find({}).sort({ id: -1 }).limit(1);
            let newId = last.length > 0 ? parseInt(last.at(-1).id + 1) : 1;

            let prod = new this.model({
                id: newId,
                timestamp: moment().format(config.TIMEFORMAT),
                ...data
            });

            const newProduct = await prod.save();

            return await this.getProduct(newId);

        } catch (error) {
            const response = {
                error: 1,
                message: `Error saving product`
            }
            return response;
        }
    }

    deleteProduct = async (id) => {
        let response = {};
        let del = await this.model.deleteOne({ id: id });
        if (del.deletedCount >= 1) {
            response.error = 0,
            response.message = `The product with id: ${id} has been deleted`;
        } else {
            response.error = 1;
            response.message = "Task could not be completed, product not found";
        }
        return response;
    }

    updateProduct = async (id, data) => {
        try {

            let upt = await this.model.updateOne({ id: id }, data);
            if (upt.modifiedCount) return await this.getProduct(id);

        } catch (error) {
            return false;
        }
    }

    filter = async (paramter, criteria, value) => {
        criteria = criteria == "==" ? "=" : criteria;
        try {
            return await this.database
                .from(this.table)
                .where(paramter, criteria, value)
                .select();
        } catch (error) {
            return [];
        }
    }
};