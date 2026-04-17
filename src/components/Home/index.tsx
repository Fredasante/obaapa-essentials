import React from "react";
// import Hero from "./Hero";
// import NewsletterPopup from "./NewsLetterPopup";
import AllProducts from "./AllProducts";
import CategoryGrid from "./CategoryGrid";
import { TestimonialsSection } from "./Hero/Testimonials";

const Home = () => {
  return (
    <main>
      {/* <NewsletterPopup /> */}
      {/* <Hero /> */}
      <AllProducts />
      <CategoryGrid
        title="Shop by Category"
        subtitle="Browse our curated selection across fashion, food, spices, teas, and more."
      />
      <TestimonialsSection />
    </main>
  );
};

export default Home;
