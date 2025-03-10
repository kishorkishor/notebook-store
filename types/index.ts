export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  features: string[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customerDetails: {
    name: string;
    email: string;
    address: string;
  };
  createdAt: Date;
};

export type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};
