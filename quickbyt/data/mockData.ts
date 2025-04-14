import { Food, Category, Order, User, CartItem } from "../types";

export const categories: Category[] = [
  {
    id: "Burger",
    name: "Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "Pizza",
    name: "Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "Pasta",
    name: "Sushi",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "Sushi",
    name: "Pasta",
    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "Dessert",
    name: "Dessert",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "Drink",
    name: "Drink",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

export const foods: Food[] = [
  {
    id: "food1",
    name: "Classic Cheeseburger",
    description:
      "Juicy beef patty with melted cheddar cheese, lettuce, tomato, and special sauce on a toasted brioche bun.",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Burger",
  },
  {
    id: "food2",
    name: "Margherita Pizza",
    description:
      "Traditional Italian pizza with fresh mozzarella, tomatoes, basil, and extra virgin olive oil.",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Pizza",
  },
  {
    id: "food3",
    name: "California Roll",
    description:
      "Sushi roll with crab, avocado, and cucumber, wrapped in seaweed and rice.",
    price: 8.5,
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Pasta",
  },
  {
    id: "food4",
    name: "Fettuccine Alfredo",
    description: "Creamy pasta with parmesan cheese sauce and fresh parsley.",
    price: 11.99,
    image:
      "https://images.unsplash.com/photo-1645112411341-6c4fd023882c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Sushi",
  },
  {
    id: "food5",
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream.",
    price: 6.99,
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Dessert",
  },
  {
    id: "food6",
    name: "Strawberry Smoothie",
    description: "Refreshing blend of fresh strawberries, yogurt, and honey.",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a90a0868?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Drink",
  },
  {
    id: "food7",
    name: "BBQ Bacon Burger",
    description:
      "Grilled beef patty with crispy bacon, cheddar cheese, and tangy BBQ sauce.",
    price: 11.99,
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Burger",
  },
  {
    id: "food8",
    name: "Pepperoni Pizza",
    description:
      "Classic pizza topped with spicy pepperoni slices and mozzarella cheese.",
    price: 13.99,
    image:
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Pizza",
  },
  {
    id: "food9",
    name: "Dragon Roll",
    description:
      "Sushi roll with eel, crab, and avocado, topped with thinly sliced avocado.",
    price: 12.5,
    image:
      "https://images.unsplash.com/photo-1617196034183-421b4917c92d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Pasta",
  },
  {
    id: "food10",
    name: "Spaghetti Carbonara",
    description:
      "Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    price: 10.99,
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Sushi",
  },
];

export const pastOrders: Order[] = [
  {
    id: "order1",
    date: "2025-05-15T14:30:00Z",
    items: [
      {
        id: "item1",
        foodId: "food1",
        name: "Classic Cheeseburger",
        price: 9.99,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        quantity: 2,
      },
      {
        id: "item2",
        foodId: "food6",
        name: "Strawberry Smoothie",
        price: 4.99,
        image:
          "https://images.unsplash.com/photo-1553530666-ba11a90a0868?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        quantity: 1,
      },
    ],
    totalAmount: 24.97,
    status: "DELIVERED",
  },
  {
    id: "order2",
    date: "2025-05-10T18:45:00Z",
    items: [
      {
        id: "item3",
        foodId: "food2",
        name: "Margherita Pizza",
        price: 12.99,
        image:
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        quantity: 1,
      },
    ],
    totalAmount: 12.99,
    status: "DELIVERED",
  },
  {
    id: "order3",
    date: "2025-05-05T12:15:00Z",
    items: [
      {
        id: "item4",
        foodId: "food3",
        name: "California Roll",
        price: 8.5,
        image:
          "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        quantity: 2,
      },
      {
        id: "item5",
        foodId: "food5",
        name: "Chocolate Lava Cake",
        price: 6.99,
        image:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        quantity: 1,
      },
    ],
    totalAmount: 23.99,
    status: "DELIVERED",
  },
  {
    id: "order4",
    date: "2025-05-01T19:30:00Z",
    items: [
      {
        id: "item6",
        foodId: "food7",
        name: "BBQ Bacon Burger",
        price: 11.99,
        image:
          "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        quantity: 1,
      },
      {
        id: "item7",
        foodId: "food10",
        name: "Spaghetti Carbonara",
        price: 10.99,
        image:
          "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        quantity: 1,
      },
    ],
    totalAmount: 22.98,
    status: "DELIVERED",
  },
];

export const userData: User = {
  id: "user1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, Anytown, CA 12345",
  profileImage:
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
};

export const cartData: CartItem[] = [
  {
    id: "cart1",
    foodId: "food1",
    name: "Classic Cheeseburger",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    quantity: 1,
  },
  {
    id: "cart2",
    foodId: "food2",
    name: "Margherita Pizza",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    quantity: 2,
  },
  {
    id: "cart2drr",
    foodId: "food2",
    name: "Margherita Pizza",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    quantity: 2,
  },
  {
    id: "cart2www",
    foodId: "food2",
    name: "Margherita Pizza",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    quantity: 2,
  },
  {
    id: "cart1www",
    foodId: "food1",
    name: "Classic Cheeseburger",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    quantity: 1,
  },
  {
    id: "carwww1",
    foodId: "food1",
    name: "Classic Cheeseburger",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    quantity: 1,
  },
];
