import { Truck, Shield, Award, Clock } from "lucide-react";

const FeaturesBar = () => {
  const features = [
    { icon: Truck, text: "Free Express Delivery", subtext: "On orders over $50" },
    { icon: Shield, text: "100% Secure Payments", subtext: "SSL Encrypted" },
    { icon: Award, text: "Premium Quality", subtext: "Guaranteed" },
    { icon: Clock, text: "24/7 Support", subtext: "Always here to help" },
  ];

  return (
    <section className="bg-surface-alt border-y border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, text, subtext }) => (
            <div key={text} className="flex items-center gap-3.5">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-soft text-brand-600 dark:text-brand-400 flex-shrink-0">
                <Icon size={22} aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{text}</p>
                <p className="text-xs text-text-muted">{subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;
