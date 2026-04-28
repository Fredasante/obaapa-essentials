import React from "react";
import Hero from "./Hero";
import AllProducts from "./AllProducts";
import CategoryGrid from "./CategoryGrid";
import { TestimonialsSection } from "./Hero/Testimonials";
import BrandPromise from "./BrandPromise";

const Home = () => {
  return (
    <main>
      <Hero />
      <AllProducts />
      <CategoryGrid
        title="Shop by Category"
        subtitle="Browse our curated selection across fashion, food, spices, teas, and more."
      />
      <TestimonialsSection />
      <BrandPromise />
    </main>
  );
};

export default Home;
