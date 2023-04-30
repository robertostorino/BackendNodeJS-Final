class ProductDTO {
    constructor ({ id, title, price, description, code, thumbnail, stock, qty, total_price }) {
        this.id = id,
        this.title = title,
        this.price = price,
        this.description = description,
        this.code = code,
        this.thumbnail = thumbnail,
        this.stock = stock,
        this.qty = qty,
        this.total_price = total_price
    }
};

export function transformToDto(products) {
    if (Array.isArray(products)) {
        return products.map(p => new ProductDTO(p))
    } else {
        return new ProductDTO(products)
    }
};

export default { ProductDTO };