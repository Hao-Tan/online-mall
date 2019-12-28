import axios from 'axios';

export const cartListMixin = {
    methods: {
        getCartList() {
            axios.get("/users/cartList").then(({data}) => { 
                if (data.status === "0") {
                    this.cartList = data.result;
                }
            })
        }
    }
}