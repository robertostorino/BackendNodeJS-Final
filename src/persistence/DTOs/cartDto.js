class CartDTO {
    constructor({ id, products }) {
        this.id = id,
        this.products = products
    }
};

export function transformToDto(carts) {
    if (Array.isArray(carts)) {
        return carts.map(c => new CartDTO(c))
    } else {
        return new CartDTO(carts)
    }
};

export default { CartDTO };