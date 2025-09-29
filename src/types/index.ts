export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'seeker' | 'provider';
  createdAt: string;
}

export interface ServiceProvider {
  id: string;
  userId: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  whatsapp?: string;
  email: string;
  location: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  profileViews: number;
  searches: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Review {
  id: string;
  providerId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface SearchFilters {
  keyword: string;
  category: string;
  location: string;
  minRating: number;
}