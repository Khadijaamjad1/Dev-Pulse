export default function FeaturesSection() {
  const features = [
    {
      title: "Discover Opportunities",
      description:
        "Find hackathons, internships, workshops, and conferences happening across Pakistan.",
      icon: "🚀",
    },
    {
      title: "Connect With Developers",
      description:
        "Join Pakistan's tech community and connect with developers, students, and organizers.",
      icon: "🤝",
    },
    {
      title: "Share Your Events",
      description:
        "Organizers can publish their tech events and reach a wider developer audience.",
      icon: "📢",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-white via-purple-50 to-purple-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">

        <h2 className="animate-[fadeInUp_0.7s_ease-out] text-center text-4xl font-bold text-gray-900">
          Why Choose DevPulse?
        </h2>

        <p className="animate-[fadeInUp_0.7s_ease-out_0.15s_both] mt-4 text-center text-gray-600">
          Everything developers need to discover and participate in tech events.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">

          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group animate-[fadeInUp_0.7s_ease-out_both] rounded-2xl border border-purple-100 bg-gradient-to-br from-white to-purple-100 p-8 text-center shadow-md transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >

              <div className="text-5xl transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-700">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}