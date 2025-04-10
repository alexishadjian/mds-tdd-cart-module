import { z } from 'zod';

export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

let cart: Product[] = [];

export const addProduct = (product: Product): void => {
  ProductSchema.parse(product);
  const existingProduct = cart.find(p => p.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cart.push(product);
  }
};

export const removeProduct = (productId: string): void => {
  cart = cart.filter(product => product.id !== productId);
};

export const getProductCount = (): number => {
  return cart.reduce((count, product) => count + product.quantity, 0);
};

export const getTotal = (): number => {
  return cart.reduce((total, product) => total + product.price * product.quantity, 0);
};

export const applyDiscount = (code: string): void => {
  if (code === 'SUMMER2025') {
    const total = getTotal();
    const discount = total * 0.2;
    cart.forEach(product => {
      product.price -= discount;
    });
  }
  else {
    throw new Error('Invalid discount code');
  }
};
