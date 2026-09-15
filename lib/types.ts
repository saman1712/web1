export type Food = {
  id: string;
  name: string;
  enName: string;
  price: string;
  origPrice: string;
  hasOff: boolean;
  priceNumber: string;
  priceUnit: string;
  description: string;
  content: string;
  image: string;
  icon: string;
  hasOption: boolean;
  eEnable: string;
};

export type Category = {
  id: string;
  name: string;
  enName: string;
  icon: string;
  items: Food[];
};

export type Brand = {
  name: string;
  fullName: string;
  instagram: string;
  instagramUrl: string;
  address: string;
  mapUrl: string;
  mapLabel: string;
  heroVideo: string;
  pattern: string;
  menuButton: string;
};

export type MenuData = {
  brand: Brand;
  categories: Category[];
};
