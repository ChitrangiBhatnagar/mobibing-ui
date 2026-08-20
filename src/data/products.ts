import iphone14 from "@/assets/p-iphone14.png";
import pixel8 from "@/assets/p-pixel8.png";
import s23 from "@/assets/p-s23.png";
import oneplus12 from "@/assets/p-oneplus12.png";
import macbook from "@/assets/p-macbook.png";
import ipadair from "@/assets/p-ipadair.png";

export type ProductCondition = "Like New" | "Excellent" | "Very Good" | "Good";
export type ProductCategory = "Phones" | "Laptops" | "Tablets";

export type Product = {
  id: string;
  name: string;
  image: string;
  condition: ProductCondition;
  price: number;
  originalPrice: number;
  warranty: string;
  seller: string;
  rating: number;
  brand: string;
  category: ProductCategory;
  storage: string;
};

const discount = (p: Product) =>
  Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

export const products: Product[] = [
  {
    id: "iphone-14",
    name: "Apple iPhone 14 · 128GB",
    image: iphone14,
    condition: "Like New",
    price: 42999,
    originalPrice: 69900,
    warranty: "12-month warranty",
    seller: "MobiBing Certified",
    rating: 4.9,
    brand: "Apple",
    category: "Phones",
    storage: "128GB",
  },
  {
    id: "pixel-8",
    name: "Google Pixel 8 · 128GB",
    image: pixel8,
    condition: "Excellent",
    price: 38499,
    originalPrice: 75999,
    warranty: "9-month warranty",
    seller: "TechLoop Bengaluru",
    rating: 4.7,
    brand: "Google",
    category: "Phones",
    storage: "128GB",
  },
  {
    id: "galaxy-s23",
    name: "Samsung Galaxy S23 · 256GB",
    image: s23,
    condition: "Like New",
    price: 44999,
    originalPrice: 84999,
    warranty: "12-month warranty",
    seller: "MobiBing Certified",
    rating: 4.8,
    brand: "Samsung",
    category: "Phones",
    storage: "256GB",
  },
  {
    id: "oneplus-12",
    name: "OnePlus 12 · 256GB",
    image: oneplus12,
    condition: "Excellent",
    price: 47999,
    originalPrice: 64999,
    warranty: "9-month warranty",
    seller: "Nova Devices",
    rating: 4.6,
    brand: "OnePlus",
    category: "Phones",
    storage: "256GB",
  },
  {
    id: "macbook-air-m2",
    name: "MacBook Air M2 · 8/256GB",
    image: macbook,
    condition: "Very Good",
    price: 71999,
    originalPrice: 114900,
    warranty: "6-month warranty",
    seller: "MobiBing Certified",
    rating: 4.8,
    brand: "Apple",
    category: "Laptops",
    storage: "256GB",
  },
  {
    id: "ipad-air",
    name: "iPad Air 5th Gen · Wi-Fi",
    image: ipadair,
    condition: "Excellent",
    price: 39999,
    originalPrice: 59900,
    warranty: "6-month warranty",
    seller: "UrbanTech Store",
    rating: 4.7,
    brand: "Apple",
    category: "Tablets",
    storage: "64GB",
  },
  {
    id: "iphone-13",
    name: "Apple iPhone 13 · 128GB",
    image: iphone14,
    condition: "Very Good",
    price: 33499,
    originalPrice: 61900,
    warranty: "9-month warranty",
    seller: "MobiBing Certified",
    rating: 4.6,
    brand: "Apple",
    category: "Phones",
    storage: "128GB",
  },
  {
    id: "pixel-7a",
    name: "Google Pixel 7a · 128GB",
    image: pixel8,
    condition: "Good",
    price: 21999,
    originalPrice: 43999,
    warranty: "6-month warranty",
    seller: "TechLoop Bengaluru",
    rating: 4.4,
    brand: "Google",
    category: "Phones",
    storage: "128GB",
  },
  {
    id: "galaxy-s22",
    name: "Samsung Galaxy S22 · 128GB",
    image: s23,
    condition: "Excellent",
    price: 29999,
    originalPrice: 72999,
    warranty: "9-month warranty",
    seller: "Nova Devices",
    rating: 4.5,
    brand: "Samsung",
    category: "Phones",
    storage: "128GB",
  },
  {
    id: "oneplus-11",
    name: "OnePlus 11 · 128GB",
    image: oneplus12,
    condition: "Very Good",
    price: 34499,
    originalPrice: 56999,
    warranty: "6-month warranty",
    seller: "UrbanTech Store",
    rating: 4.5,
    brand: "OnePlus",
    category: "Phones",
    storage: "128GB",
  },
  {
    id: "macbook-pro-m1",
    name: "MacBook Pro M1 · 8/512GB",
    image: macbook,
    condition: "Good",
    price: 84999,
    originalPrice: 149900,
    warranty: "6-month warranty",
    seller: "MobiBing Certified",
    rating: 4.7,
    brand: "Apple",
    category: "Laptops",
    storage: "512GB",
  },
  {
    id: "ipad-10",
    name: "iPad 10th Gen · Wi-Fi 64GB",
    image: ipadair,
    condition: "Like New",
    price: 27999,
    originalPrice: 39900,
    warranty: "9-month warranty",
    seller: "TechLoop Bengaluru",
    rating: 4.6,
    brand: "Apple",
    category: "Tablets",
    storage: "64GB",
  },
];

export const productDiscount = discount;

export const brands = [...new Set(products.map((p) => p.brand))].sort();
export const categories: ProductCategory[] = ["Phones", "Laptops", "Tablets"];
export const conditions: ProductCondition[] = [
  "Like New",
  "Excellent",
  "Very Good",
  "Good",
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatINR = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;
