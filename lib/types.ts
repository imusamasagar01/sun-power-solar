export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type SpecItem = {
  label: string;
  value: string;
};

export type DocumentItem = {
  name: string;
  url: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  price: number;
  discount_price: number | null;
  category_id: string | null;
  category?: Category | null;
  images: string[];
  videos: string[];
  documents: DocumentItem[];
  features: string[];
  specifications: SpecItem[];
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
};

export type Announcement = {
  id: string;
  title: string;
  message: string;
  cta_label: string | null;
  cta_href: string | null;
  is_active: boolean;
  created_at: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  product_name: string | null;
  created_at: string;
};
