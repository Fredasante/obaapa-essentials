export interface Category {
  id: string;
  title: string;
  subtext: string;
  value: string;
  image: string;
  className?: string;
}

export const categories: Category[] = [
  {
    id: "1",
    title: "Fashion",
    subtext: "Style & Essentials",
    value: "fashion",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop",
    className: "col-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: "2",
    title: "Foods",
    subtext: "Pantry & Staples",
    value: "foods",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=800&fit=crop",
    className: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    id: "3",
    title: "Spices",
    subtext: "Bold Flavors",
    value: "spices",
    image:
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&h=800&fit=crop",
    className: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    id: "4",
    title: "Teas and Herbs",
    subtext: "Calm & Wellness",
    value: "teas-and-herbs",
    image:
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&h=600&fit=crop",
    className: "col-span-2 md:col-span-2 md:row-span-1",
  },
  {
    id: "5",
    title: "Others",
    subtext: "Hidden Gems",
    value: "others",
    image:
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&h=600&fit=crop",
    className: "col-span-2 md:col-span-2 md:row-span-1",
  },
];
