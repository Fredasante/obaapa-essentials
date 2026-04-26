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
      "https://plus.unsplash.com/premium_photo-1705352059500-6a141750a8be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "col-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: "2",
    title: "Foods",
    subtext: "Pantry & Staples",
    value: "foods",
    image:
      "https://images.unsplash.com/photo-1701566619911-2dcb1e29b1dc?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
