import { describe, expect, it } from "vitest";
import { addProduct, removeProduct, getProductCount, getTotal, applyDiscount } from '../src/cart';
import { Product } from '../src/cart';

const sampleProduct: Product = {
  id: '1',
  name: 'Sample Product',
  price: 100,
  quantity: 1,
};

const anotherProduct: Product = {
  id: '2',
  name: 'Another Product',
  price: 200,
  quantity: 2,
};

const invalidProduct: any = {
  id: '3',
  name: 'Invalid Product',
  price: -50,
  quantity: 0,
};

describe("cart module", () => {
  it("should add a product to the cart", () => {
    addProduct(sampleProduct);
    expect(getProductCount()).toBe(1);
  });

  it("should add an existing product to the cart", () => {
    addProduct(sampleProduct);
    addProduct(sampleProduct);
    expect(getProductCount()).toBe(2);
  });

  it("should remove a product from the cart", () => {
    addProduct(sampleProduct);
    removeProduct(sampleProduct.id);
    expect(getProductCount()).toBe(0);
  });

  it("should not remove a non-existing product from the cart", () => {
    addProduct(sampleProduct);
    removeProduct('non-existing-id');
    expect(getProductCount()).toBe(1);
  });

  it("should calculate the total price of the cart", () => {
    addProduct(sampleProduct);
    addProduct(anotherProduct);
    expect(getTotal()).toBe(500);
  });

  it("should throw an error for invalid product data", () => {
    expect(() => addProduct(invalidProduct)).toThrow();
  });

  it("should apply a valid discount code", () => {
    applyDiscount('SUMMER2025');
    expect(getTotal()).toBe(400);
  });

  it("should throw an error for invalid discount code", () => {
    expect(() => applyDiscount('INVALID_CODE')).toThrow();
  });
});