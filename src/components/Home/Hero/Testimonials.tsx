import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Ordered the kente top and a jar of the dawadawa spice mix. The fabric is GORGEOUS and the spice made my kitchen smell like home. Already planning my next order lol.",
      name: "Abena M.",
      designation: "Verified Customer",
      src: "https://plus.unsplash.com/premium_photo-1759569362033-8d8291915a0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8",
    },
    {
      quote:
        "Got the bundled hibiscus tea and shito spice set for my wife and she was so impressed 😂 The quality is legit, way better than I expected for the price.",
      name: "Maame Yaa W.",
      designation: "Verified Customer",
      src: "https://images.unsplash.com/photo-1675815033518-1a21f06553c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
    },
    {
      quote:
        "Third time ordering from Obaapa Essentials and every parcel arrives perfect. The herbal teas especially — my friends always ask where I get them from. Keep it up! 🔥",
      name: "Nana Esi",
      designation: "Verified Customer",
      src: "https://images.unsplash.com/photo-1566599263156-55a16c37d54b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
    },
    {
      quote:
        "Honestly the pictures don't even do these pieces justice. The fashion pieces fit beautifully and the foods taste like home 🏡",
      name: "Serwaa B.",
      designation: "Verified Customer",
      src: "https://images.unsplash.com/photo-1725114077889-d38ea6c4487d?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
