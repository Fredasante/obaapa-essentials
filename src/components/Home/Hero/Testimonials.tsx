import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "I wasn't sure what to expect ordering online but the vase I got is STUNNING. My living room looks like a whole different place now lol. Already eyeing the candle holders for my bedroom.",
      name: "Abena M.",
      designation: "Verified Customer",
      src: "https://images.unsplash.com/photo-1636302926027-9619142d7173?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Got this for my wife's birthday and she was so impressed she thought I hired a decorator 😂 The quality is legit, way better than I expected for the price.",
      name: "Kwame A.",
      designation: "Verified Customer",
      src: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=300&h=300&fit=crop&crop=face",
    },
    {
      quote:
        "Third time ordering from Hedlorm and every single piece arrives perfect. The scented candles especially — my guests always ask where I get them from. Keep it up! 🔥",
      name: "Nana Esi",
      designation: "Verified Customer",
      src: "https://images.unsplash.com/photo-1664629153062-1471c35ced65?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Honestly the pictures don't even do these pieces justice. Everything looks even better in person. My apartment finally feels like home 🏡",
      name: "Serwaa B.",
      designation: "Verified Customer",
      src: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=300&h=300&fit=crop&crop=face",
    },
  ];

  return (
    <section className="py-10 md:py-15 bg-[#F7F8FA]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center">
          <h2 className="text-[28px] md:text-4xl font-bold text-dark mb-3 md:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elevating experiences for customers who expect more.
          </p>
        </div>
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </section>
  );
}
