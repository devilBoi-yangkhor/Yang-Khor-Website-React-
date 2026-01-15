import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Animated Floating Particles (for background)
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-30 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// Hero Section with Dynamic Background & Agri-Tech Visuals
// Hero Section with Dynamic Background & Agri-Tech Visuals
const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-20 pb-24 md:pt-32 md:pb-32 px-6 overflow-hidden">
    {/* --- BACKGROUND LAYER 1: Soft Agricultural Texture --- */}
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />

    {/* --- BACKGROUND LAYER 2: Gradient Depth --- */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50 opacity-90"></div>

    {/* --- BACKGROUND LAYER 3: Organic Blur Overlay (Simulated Fog/Field Haze) --- */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large Soft Blur Blob - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      {/* Medium Blur Blob - Top Left */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      {/* Small Glow - Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200/10 rounded-full blur-xl"></div>
    </div>

    {/* --- ABSTRACT SVG PATTERN (Soil Grid) --- */}
    <svg
      className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4ade80" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>

    {/* --- Floating Particles (Light Dust / Pollen Effect) --- */}
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-emerald-300/40 rounded-full animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
            opacity: 0.2 + Math.random() * 0.3,
          }}
        />
      ))}
    </div>

    {/* --- DECORATIVE SVG: Smart Farm Horizon --- */}
    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-48 opacity-20 pointer-events-none">
      <svg viewBox="0 0 800 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Horizon Line */}
        <path d="M0 80 Q200 40, 400 80 T800 80" stroke="#4ade80" strokeWidth="2" fill="none" />

        {/* Drone Icon */}
        <g transform="translate(120, 40)">
          <circle cx="0" cy="0" r="6" fill="#3b82f6" />
          <rect x="-4" y="-2" width="8" height="1" fill="#3b82f6" />
          <rect x="-1" y="-4" width="2" height="8" fill="#3b82f6" />
          <rect x="-4" y="2" width="8" height="1" fill="#3b82f6" />
        </g>

        {/* IoT Sensor */}
        <g transform="translate(320, 60)">
          <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#10b981" />
          <circle cx="0" cy="0" r="2" fill="#ffffff" />
        </g>

        {/* Solar Panel */}
        <g transform="translate(580, 70)">
          <rect x="-15" y="-5" width="30" height="10" rx="1" fill="#fbbf24" />
          <rect x="-12" y="-3" width="6" height="6" fill="#f59e0b" />
          <rect x="-3" y="-3" width="6" height="6" fill="#f59e0b" />
          <rect x="6" y="-3" width="6" height="6" fill="#f59e0b" />
        </g>
      </svg>
    </div>

    {/* --- CONTENT --- */}
    <div className="relative max-w-6xl mx-auto text-center z-30">
      <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 tracking-tight">
        AgriTech Hub
      </h1>
      <p className="text-xl md:text-2xl text-gray-800 mb-10 max-w-4xl mx-auto leading-relaxed font-medium">
        Where AI meets soil. Where IoT grows harvests. Where innovation transforms farming into intelligence.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
        <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          Explore Our Solutions
        </button>
        <button className="px-8 py-4 border-2 border-emerald-400 text-emerald-700 font-semibold rounded-full hover:bg-emerald-50 transition-all duration-300">
          Watch Demo
        </button>
      </div>

      {/* Subtle Stats Bar */}
      <div className="flex justify-center gap-12 mt-16 text-sm text-gray-600">
        <div className="text-center">
          <div className="font-bold text-emerald-600">20+</div>
          <div>Smart Farms Deployed</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-cyan-600">150+</div>
          <div>Farmers Empowered</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-purple-600">2025</div>
          <div>Founded</div>
        </div>
      </div>
    </div>
  </section>
);

// Mission Statement Card - ✅ FIXED: Now readable!
const MissionCard = ({ title, children, icon, color }) => (
  <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 text-center">
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-gradient-to-br ${color}`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-700 italic text-lg leading-relaxed">{children}</p>
  </div>
);

// Technology Pillars Section — Now with Visual Icons
const TechPillars = () => (
  <section className="py-20 px-6">
    <div className="max-w-6xl mx-auto text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500">
        Powered By
      </h2>
      <p className="text-gray-600 text-lg max-w-3xl mx-auto">
        We fuse cutting-edge digital tools with real-world agricultural needs to build solutions that grow with the land.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "Artificial Intelligence",
          desc: "Predictive crop analytics, pest detection, yield forecasting using ML models trained on Bhutanese climate data.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          ),
          gradient: "from-indigo-500 to-purple-600",
          image: "assets/agritech/ai-farming.jpg",
        },
        {
          title: "Internet of Things (IoT)",
          desc: "Soil sensors, drone monitoring, automated irrigation systems connected in real-time across remote valleys.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
          ),
          gradient: "from-green-500 to-teal-500",
          image: "assets/agritech/iot-sensors.jpg",
        },
        {
          title: "ICT Integration",
          desc: "Mobile apps for farmers, blockchain traceability, digital marketplaces linking rural producers to urban consumers.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-600">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          ),
          gradient: "from-blue-500 to-cyan-500",
          image: "assets/agritech/digital-market.jpg",
        },
      ].map((tech, idx) => (
        <div
          key={idx}
          className="group relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
        >
          <div className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-700" style={{ backgroundImage: `url(${tech.image})` }}></div>
          <div className="relative z-10">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 bg-gradient-to-br ${tech.gradient} text-white`}>
              {tech.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{tech.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{tech.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// Innovation Showcase Section — Replaces Team Section
const InnovationShowcase = () => (
  <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500">
        Our Innovations in Action
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Left Side: Smart Irrigation */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
          <div className="mb-6 h-48 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <img
              src="assets/agri_tech/smart-irrigation-systems.jpg"
              alt="Smart Irrigation System"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-4 left-4 text-white">
              <span className="px-3 py-1 bg-emerald-500/80 text-white text-xs font-bold rounded-full">
                Smart Irrigation
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Precision Watering</h3>
          <p className="text-gray-700 leading-relaxed">
            AI-powered drip systems adjust water flow based on soil moisture, weather forecasts, and crop type — reducing waste by up to 60%.
          </p>
        </div>

        {/* Right Side: Drone Monitoring */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
          <div className="mb-6 h-48 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <img
              src="assets/agri_tech/drones-and-UAV-mapping.jpg"
              alt="Drone Crop Monitoring"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-4 left-4 text-white">
              <span className="px-3 py-1 bg-cyan-500/80 text-white text-xs font-bold rounded-full">
                Drone Surveillance
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Aerial Crop Health</h3>
          <p className="text-gray-700 leading-relaxed">
            High-res drones capture multispectral imagery to detect disease, nutrient deficiency, and stress before it spreads — saving crops and yields.
          </p>
        </div>
      </div>

      {/* Bottom Banner: Blockchain Traceability */}
      <div className="bg-gradient-to-r from-emerald-900/10 to-cyan-900/10 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-12 text-center">
        <h3 className="text-3xl font-bold text-emerald-700 mb-6">
          From Farm to Table — Transparent & Trusted
        </h3>
        <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto">
          Every product is tracked via blockchain — farmers get fair prices, consumers know exactly where their food comes from, and quality is guaranteed at every step.
        </p>
        <div className="flex justify-center space-x-8 text-sm text-gray-600">
          <div className="text-center">
            <div className="font-bold text-emerald-600">✅ Real-Time Tracking</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-cyan-600">🔒 Immutable Records</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-purple-600">📱 Farmer App Access</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Footer Credit
const FooterCredit = () => (
  <div className="text-center py-8 text-gray-500 text-sm border-t border-gray-200">
    © 2025 Yang Khor Pvt. Ltd — Innovation & Agri-Tech Division | Building Tomorrow’s Harvest, Today
  </div>
);

function AgriTechFunc() {
  useEffect(() => {
    document.body.classList.add("overflow-x-hidden");
    return () => {
      document.body.classList.remove("overflow-x-hidden");
    };
  }, []);

  return (
    <>
      <FloatingParticles />
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Mission & Vision Cards */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <MissionCard
            title="Our Vision"
            color="from-emerald-500 to-teal-500"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            }
          >
            "Transform ideas into innovative value to enhance the growth of industries, markets, and lives in our country in the booming Digital Era."
          </MissionCard>

          <MissionCard
            title="Our Mission"
            color="from-green-500 to-blue-500"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
            }
          >
            "To provide the best and the most affordable technology solutions to our customers."
          </MissionCard>
        </div>
      </section>

      {/* Tech Pillars */}
      <TechPillars />

      {/* Innovation Showcase — Replaces Team Section */}
      <InnovationShowcase />

      {/* Footer Credit */}
      <FooterCredit />

      <Footer />
    </>
  );
}

export default AgriTechFunc;