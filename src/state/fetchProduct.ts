import axios from "axios";

const api = 'http://localhost:5454/products'

export const fetchProduct = async () => {
    try {
        const res = await axios.get(api)

        console.log('all product',res)
    }catch (e) {
        console.error(e)
    }
}