import iphone14 from "@/assets/p-iphone14.png";
import pixel8 from "@/assets/p-pixel8.png";
import s23 from "@/assets/p-s23.png";
import oneplus12 from "@/assets/p-oneplus12.png";
import macbook from "@/assets/p-macbook.png";
import ipadair from "@/assets/p-ipadair.png";

export type Product = {
  id: string;
  name: string;
  image: string;
  condition: "Like New" | "Excellent" | "Very Good" | "Good";
  price: number;
  originalPrice: number;
  warranty: string;
  seller: string;
  rating: number;
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
  },
];

export const productDiscount = discount;

export const formatINR = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;
