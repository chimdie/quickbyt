export type Food = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: CategoryT;
};

export type Category = {
  id: string;
  name: CategoryT;
  image: string;
};

export type CartItem = {
  id: string;
  foodId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type Order = {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage?: string;
};

export const OrderStatus = {
  delivered: "DELIVERED",
  processing: "PROCESSING",
  cancelled: "CANCELLED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const CategoryT = {
  burger: "Burger",
  pizza: "Pizza",
  sushi: "Sushi",
  pasta: "Pasta",
  dessert: "Dessert",
  drink: "Drink",
} as const;

export type CategoryT = (typeof CategoryT)[keyof typeof CategoryT];
