import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: MapPin, title: "Address", info: "123 Tech Lane, Kolkata, India" },
    { icon: Mail, title: "Email", info: "support@shopsphere.com" },
    { icon: Phone, title: "Phone", info: "+91 98765 43210" },
    { icon: Clock, title: "Working Hours", info: "Mon - Sat: 9AM - 9PM" },
  ];

  const supportFeatures = [
    { icon: MessageSquare, title: "Quick Response", desc: "We typically respond within 2-4 hours" },
    { icon: Mail, title: "Expert Team", desc: "Professional and friendly support staff" },
    { icon: Clock, title: "24/7 Available", desc: "Round the clock assistance" },
  ];

  return (
    <div className="min-h-screen text-foreground">
      {/* Hero */}
      <section className="bg-hero-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-brand-200 dark:border-brand-800 bg-primary-soft text-sm font-semibold text-brand-700 dark:text-brand-300 mb-6">
            <MessageSquare size={15} aria-hidden />
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">Contact Us</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Have a question or need support? We're here to help you with your electronics journey.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {contactInfo.map(({ icon: Icon, title, info }) => (
            <Card key={title} hoverable className="group text-center">
              <span className="mx-auto mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-primary-soft text-brand-600 dark:text-brand-400 transition-transform group-hover:scale-110">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="font-bold mb-1.5">{title}</h3>
              <p className="text-text-muted text-sm">{info}</p>
            </Card>
          ))}
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Info */}
          <Card className="!p-8 md:!p-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-brand-200 dark:border-brand-800 bg-primary-soft text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-5">
              Premium Support
            </span>
            <h2 className="text-3xl font-extrabold mb-4">Let's Talk</h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              Our dedicated support team is available 24/7 to assist you with any questions, concerns, or
              feedback. We're committed to providing you with the best shopping experience possible.
            </p>

            <div className="space-y-4">
              {supportFeatures.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface-alt">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-soft text-brand-600 dark:text-brand-400 flex-shrink-0">
                    <Icon size={18} aria-hidden />
                  </span>
                  <div>
                    <h4 className="font-semibold mb-0.5">{title}</h4>
                    <p className="text-sm text-text-muted">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Right - Form */}
          <Card className="!p-8 md:!p-10">
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>

            {submitted && (
              <div role="status" className="mb-5 rounded-lg bg-success-soft border border-success/20 px-4 py-3 text-sm font-medium text-success">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Your Name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
              <Textarea
                label="Your Message"
                name="message"
                rows="6"
                placeholder="Tell us how we can help you..."
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button type="submit" size="lg" className="w-full">
                <Send size={17} aria-hidden />
                Send Message
              </Button>
            </form>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-xl border border-border bg-hero-bg p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Need Immediate Assistance?</h3>
          <p className="text-lg text-text-secondary mb-7 max-w-2xl mx-auto">
            Our support team is always ready to help. Reach out via phone or email for immediate assistance with
            your orders and queries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 font-semibold hover:border-border-strong hover:bg-surface-hover transition-colors"
            >
              <Phone size={17} aria-hidden />
              Call Us Now
            </a>
            <a
              href="mailto:support@shopsphere.com"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 transition-colors"
            >
              <Mail size={17} aria-hidden />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
