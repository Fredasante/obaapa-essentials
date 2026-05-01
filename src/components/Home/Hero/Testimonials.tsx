import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Ordered the kente top and a jar of the dawadawa spice mix. The fabric is GORGEOUS and the spice made my kitchen smell like home. Already planning my next order lol.",
      name: "Abena M.",
      designation: "Verified Customer",
    },
    {
      quote:
        "Got the bundled hibiscus tea and shito spice set for my wife and she was so impressed 😂 The quality is legit, way better than I expected for the price.",
      name: "Maame Yaa W.",
      designation: "Verified Customer",
    },
    {
      quote:
        "Third time ordering from Obaapa Essentials and every parcel arrives perfect. The herbal teas especially — my friends always ask where I get them from. Keep it up! 🔥",
      name: "Nana Esi",
      designation: "Verified Customer",
    },
    {
      quote:
        "Honestly the pictures don't even do these pieces justice. The fashion pieces fit beautifully and the foods taste like home 🏡",
      name: "Serwaa B.",
      designation: "Verified Customer",
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
