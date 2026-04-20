import { BRAND } from "../../contants/messages";

const BrandPanel = () => (
  <div className="flex-1 bg-gradient-to-br from-[#e94560] to-[#0f3460] flex flex-col items-center justify-center p-10 text-white">
    {/* Logo */}
    <div className="text-6xl mb-4">{BRAND.logo}</div>
    <h1 className="text-3xl font-bold mb-2">{BRAND.name}</h1>
    <p className="text-sm opacity-80 text-center leading-relaxed">
      {BRAND.tagline}
    </p>

    {/* Features */}
    <div className="mt-8 w-full space-y-3">
      {BRAND.features.map((feature, index) => (
        <div key={index} className="flex items-center gap-3 text-sm opacity-90">
          <span className="text-lg">✅</span>
          <span>{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

export default BrandPanel;
