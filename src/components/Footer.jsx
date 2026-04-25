import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  // Don't render footer on auth pages
  if (isAuthPage) return null;

  return (
    <footer className="border-t border-slate-200 bg-[#F1F5F9] mt-20 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 ">
        {/* Footer Content Grid */}
        <div className="hidden lg:block grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-6 hover:opacity-80 transition-opacity">
                <div className="h-10 w-10 sm:h-11 sm:w-11 bg-gradient-to-br rounded-xl p-1.5 shadow-sm ring-1 ring-indigo-200/70 flex items-center justify-center overflow-hidden">
                      <img src={logo} alt="ApleShahar logo" className="h-full w-full object-contain" />
                   </div>
              <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">ApleShahar</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Empowering communities through transparent civic engagement and collaborative problem-solving.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl p-8 mb-12 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                  <Mail className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">Email us</p>
                <a href="mailto:support@apleshahar.com" className="text-sm  hover:text-indigo-600 transition-colors">
                  support@apleshahar.com
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                  <Phone className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">Call us</p>
                <a href="tel:+919876543210" className="text-sm hover:text-indigo-600 transition-colors">
                  +91 (98765) 43210
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">Visit us</p>
                <p className="text-sm">
                  Pune, Maharashtra, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-black">
            © {currentYear} ApleShahar. All rights reserved. Made with ❤️ for our community.
          </p>
          <div className="flex gap-8 text-sm">
            <a href="#" className="text-black hover:text-indigo-600 transition-colors font-medium">Status</a>
            <a href="#" className="text-black hover:text-indigo-600 transition-colors font-medium">Sitemap</a>
            <a href="#" className="text-black hover:text-indigo-600 transition-colors font-medium">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
