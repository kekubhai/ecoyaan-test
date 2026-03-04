import type { CartApiResponse } from "@/types";

export const mockCart: CartApiResponse = {
  cartItems: [
    {
      product_id: 101,
      product_name: "Bamboo Toothbrush (Pack of 4)",
      product_price: 299,
      quantity: 2,
      image:
        "https://i.pinimg.com/736x/cd/84/87/cd8487ffad9bfc244ed446f2db079424.jpg",
    },
    {
      product_id: 102,
      product_name: "Reusable Cotton Produce Bags",
      product_price: 450,
      quantity: 1,
      image:
        "https://i.pinimg.com/1200x/97/dc/f2/97dcf2b4dc33c3913a1f4c1cfb9c3893.jpg",
    },
    {
      product_id: 103,
      product_name: "Stainless-Steel Straws with Cleaning Brush",
      product_price: 199,
      quantity: 3,
      image:
        "https://i.pinimg.com/1200x/c5/af/8c/c5af8c0bd719c21eb1f6edae2f600c5d.jpg",
    },
    {
      product_id: 104,
      product_name: "Beeswax Food Wraps (Set of 3)",
      product_price: 349,
      quantity: 1,
      image:
        "https://i.pinimg.com/736x/f7/c6/cc/f7c6cc66cc84a7aaade3af145d0d9ef7.jpg",
    },
    {
      product_id: 105,
      product_name: "Bamboo Cutlery Travel Set",
      product_price: 249,
      quantity: 2,
      image:
        "https://i.pinimg.com/736x/fa/b3/28/fab32818ae59621acd173b3b6d8980d9.jpg",
    },
  ],
  shipping_fee: 50,
  discount_applied: 0,
};