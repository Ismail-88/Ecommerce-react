import React from "react";
import { Link } from "react-router-dom";
import { Crown, Sparkles, Target, Eye, Award, Users, Zap, Shield, ArrowRight } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import Card from "../../components/ui/Card";

const About = () => {
  const features = [
    { icon: Award, title: "Premium Quality", desc: "Top-quality products from trusted brands" },
    { icon: Zap, title: "Lightning Fast", desc: "Quick and secure shipping" },
    { icon: Shield, title: "Reliable Support", desc: "24/7 customer assistance" },
    { icon: Users, title: "Easy Returns", desc: "Hassle-free shopping experience" },
  ];

  return (
    <div className="min-h-screen text-foreground">
      {/* Hero Section */}
      <section className="bg-hero-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-brand-200 dark:border-brand-800 bg-primary-soft text-sm font-semibold text-brand-700 dark:text-brand-300 mb-6">
            <Crown size={15} className="text-warning" aria-hidden />
            About Us
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">
            Welcome to{" "}
            <span className="text-brand-600 dark:text-brand-400">
              ShopSphere
            </span>
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Your one-stop destination for the latest and greatest in electronics. From cutting-edge gadgets to
            must-have accessories, we're here to power up your tech life.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        {/* Mission */}
        <Card className="mb-12 !p-8 md:!p-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-soft text-brand-600 dark:text-brand-400 flex-shrink-0">
              <Target size={28} aria-hidden />
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold">Our Mission</h2>
          </div>
          <p className="text-lg text-text-secondary leading-relaxed">
            At ShopSphere, our mission is to make innovative technology accessible to everyone. We're passionate
            about connecting people with the tools and tech they need to thrive in a digital world — all at
            competitive prices and delivered with speed and care.
          </p>
        </Card>

        {/* Why Choose Us */}
        <div className="mb-12">
          <SectionHeading
            eyebrow="Why ShopSphere"
            title="Why Choose ShopSphere?"
            description="We combine premium products with an effortless shopping experience."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <Card key={title} hoverable className="group">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-soft text-brand-600 dark:text-brand-400 mb-5 transition-transform group-hover:scale-110">
                  <Icon size={24} aria-hidden />
                </span>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-text-muted leading-relaxed text-sm">{desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Vision */}
        <Card className="mb-12 !p-8 md:!p-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-soft text-brand-600 dark:text-brand-400 flex-shrink-0">
              <Eye size={28} aria-hidden />
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold">Our Vision</h2>
          </div>
          <p className="text-lg text-text-secondary leading-relaxed">
            We envision a future where technology elevates everyday life. At ShopSphere, we're committed to
            staying ahead of the curve, offering cutting-edge solutions that are both practical and affordable.
          </p>
        </Card>

        {/* CTA */}
        <div className="rounded-xl border border-border bg-hero-bg p-10 md:p-14 text-center">
          <Sparkles size={32} className="mx-auto mb-5 text-brand-600 dark:text-brand-400 animate-pulse-soft" aria-hidden />
          <h3 className="text-2xl md:text-4xl font-extrabold mb-4">
            Join the{" "}
            <span className="text-brand-600 dark:text-brand-400">
              ShopSphere Family
            </span>
          </h3>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Whether you're a tech enthusiast, a professional, or just looking for something cool and functional —
            ShopSphere has something for everyone.
          </p>
          <Link to="/products">
            <Button size="lg">
              Start Shopping
              <ArrowRight size={18} aria-hidden />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
