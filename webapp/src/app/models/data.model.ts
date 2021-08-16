export interface ProductDetails{
  id: string;
  imageURL: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  visible?: boolean;
  inCart?: boolean;
}

export interface CategorySelection{
  id: string;
  imageUrl: string;
  name: string;
  key: string;
  description: string;
}

export interface CartDetails{
  id: string;
  imageURL: string;
  name: string;
  category: string;
  description: string;
  price: number;
  itemCount: number;
}

export interface BannerDetails{
  id: string;
  bannerImageUrl: string;
  bannerImageAlt: string;
  isActive: boolean;
  order: number;
}
