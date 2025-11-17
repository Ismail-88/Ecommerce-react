// pages/Contact.jsx
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Crown, Sparkles } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    { icon: MapPin, title: 'Address', info: '123 Tech Lane, Kolkata, India', color: 'from-cyan-500/20 to-blue-500/20' },
    { icon: Mail, title: 'Email', info: 'support@shopsphere.com', color: 'from-blue-500/20 to-purple-500/20' },
    { icon: Phone, title: 'Phone', info: '+91 98765 43210', color: 'from-purple-500/20 to-pink-500/20' },
    { icon: Clock, title: 'Working Hours', info: 'Mon - Sat: 9AM - 9PM', color: 'from-pink-500/20 to-rose-500/20' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px]"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-5 py-2 mb-6">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              GET IN TOUCH
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="block mb-2">Contact</span>
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-2xl opacity-50"></span>
              <span className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                ShopSphere
              </span>
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a question or need support? We're here to help you with your electronics journey.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-6 hover:border-cyan-500/30 transition-all"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all"></div>
              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.info}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Info */}
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-12">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2 mb-6">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-bold text-gray-300">PREMIUM SUPPORT</span>
              </div>
              
              <h2 className="text-4xl font-black mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Let's Talk
                </span>
              </h2>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Our dedicated support team is available 24/7 to assist you with any questions, concerns, or feedback. We're committed to providing you with the best shopping experience possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl border border-white/10 bg-white/5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Quick Response</h4>
                    <p className="text-sm text-gray-400">We typically respond within 2-4 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl border border-white/10 bg-white/5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Expert Team</h4>
                    <p className="text-sm text-gray-400">Professional and friendly support staff</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl border border-white/10 bg-white/5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">24/7 Available</h4>
                    <p className="text-sm text-gray-400">Round the clock assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl p-12">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
            <div className="relative">
              <h3 className="text-3xl font-black mb-8">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    rows="6"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative flex items-center justify-center gap-3 py-4 text-white font-bold text-lg">
                    <Send className="w-5 h-5" />
                    Send Message
                    <Sparkles className="w-5 h-5" />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map or Additional Info Section */}
        <div className="mt-16 relative rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-3xl p-12 text-center">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="relative">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-cyan-400" />
            <h3 className="text-3xl font-black mb-4">
              Need Immediate Assistance?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our support team is always ready to help. Reach out via phone or email for immediate assistance with your orders and queries.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+919876543210"
                className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl font-bold hover:border-cyan-500/50 transition-all"
              >
                <Phone className="w-5 h-5 inline mr-2" />
                Call Us Now
              </a>
              <a
                href="mailto:support@shopsphere.com"
                className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl font-bold hover:border-cyan-500/50 transition-all"
              >
                <Mail className="w-5 h-5 inline mr-2" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;