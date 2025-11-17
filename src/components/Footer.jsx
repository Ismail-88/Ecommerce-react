// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa';
import { Mail, Phone, MapPin, Send, Sparkles, Crown, Shield, Truck, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='relative bg-black text-white border-t border-white/5 overflow-hidden'>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]"></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.03),transparent_70%)]"></div>

      {/* Main Footer Content */}
      <div className='relative max-w-7xl mx-auto px-4 md:px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
          {/* Brand Info */}
          <div className='space-y-6'>
            <Link to='/' className='inline-block'>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h1 className='relative text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'>
                  ShopSphere
                </h1>
              </div>
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-bold text-gray-300">PREMIUM MARKETPLACE</span>
            </div>
            <p className='text-gray-400 leading-relaxed'>
              Powering Your World with the Best in Electronics. Experience luxury shopping redefined.
            </p>
            
            {/* Contact Info */}
            <div className='space-y-3'>
              <div className='flex items-start gap-3 text-sm'>
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className='text-gray-400'>123 Electronics St, Style City, NY 10001</span>
              </div>
              <div className='flex items-center gap-3 text-sm'>
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <a href="mailto:support@shopsphere.com" className='text-gray-400 hover:text-cyan-400 transition-colors'>
                  support@shopsphere.com
                </a>
              </div>
              <div className='flex items-center gap-3 text-sm'>
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <a href="tel:+11234567890" className='text-gray-400 hover:text-cyan-400 transition-colors'>
                  (123) 456-7890
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-xl font-bold mb-6 flex items-center gap-2'>
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Quick Links
            </h3>
            <ul className='space-y-3'>
              {[
                { name: 'Products', path: '/products' },
                { name: 'My Orders', path: '/orders' },
                { name: 'Track Order', path: '/track-order' },
                { name: 'Cart', path: '/cart' },
                { name: 'About Us', path: '/about' }
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.path}
                    className='text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group'
                  >
                    <span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className='text-xl font-bold mb-6 flex items-center gap-2'>
              <Shield className="w-5 h-5 text-cyan-400" />
              Customer Service
            </h3>
            <ul className='space-y-3'>
              {[
                'Contact Us',
                'Shipping & Returns',
                'FAQs',
                'Order Tracking',
                'Size Guide'
              ].map((item, i) => (
                <li key={i}>
                  <a 
                    href="#"
                    className='text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group'
                  >
                    <span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className='text-xl font-bold mb-6'>Stay in the Loop</h3>
            <p className='text-gray-400 text-sm mb-6 leading-relaxed'>
              Subscribe to get special offers, free giveaways, and exclusive updates
            </p>
            
            <form className='space-y-4'>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="email" 
                  placeholder='Your email address'
                  className='w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-all'
                />
              </div>
              <button 
                type='submit' 
                className='group relative w-full overflow-hidden rounded-xl'
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center justify-center gap-2 py-3 text-white font-bold">
                  <Send className="w-4 h-4" />
                  Subscribe
                </span>
              </button>
            </form>

            {/* Social Media */}
            <div className='mt-8'>
              <h4 className='text-sm font-bold mb-4 text-gray-400 uppercase tracking-wider'>Follow Us</h4>
              <div className='flex gap-3'>
                {[
                  { icon: FaFacebook, color: 'from-blue-500/20 to-blue-600/20', hoverColor: 'hover:border-blue-500/50' },
                  { icon: FaInstagram, color: 'from-pink-500/20 to-purple-600/20', hoverColor: 'hover:border-pink-500/50' },
                  { icon: FaTwitterSquare, color: 'from-cyan-500/20 to-blue-600/20', hoverColor: 'hover:border-cyan-500/50' },
                  { icon: FaPinterest, color: 'from-red-500/20 to-rose-600/20', hoverColor: 'hover:border-red-500/50' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`group w-12 h-12 rounded-xl border border-white/10 bg-gradient-to-br ${social.color} backdrop-blur-xl flex items-center justify-center ${social.hoverColor} transition-all hover:scale-110`}
                  >
                    <social.icon className="text-xl text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
            { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
            { icon: Award, title: 'Quality Products', desc: 'Premium selection' },
            { icon: Phone, title: '24/7 Support', desc: 'Always here to help' }
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-500/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">{feature.title}</p>
                <p className="text-xs text-gray-400">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className='relative border-t border-white/10'>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
        <div className='relative max-w-7xl mx-auto px-4 md:px-6 py-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm'>
            <p className='text-gray-400'>
              &copy; {new Date().getFullYear()}{' '}
              <span className='font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>
                ShopSphere
              </span>
              . All rights reserved
            </p>
            <div className='flex items-center gap-6 text-gray-400'>
              <a href="#" className='hover:text-cyan-400 transition-colors'>Privacy Policy</a>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <a href="#" className='hover:text-cyan-400 transition-colors'>Terms of Service</a>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <a href="#" className='hover:text-cyan-400 transition-colors'>Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;