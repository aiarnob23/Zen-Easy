import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="bg-black w-full py-8 px-4 mt-auto footer">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-300">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/main/about-us" className=" hover-primary">About Us</Link></li>
              <li><Link to="/careers" className=" hover-primary">Careers</Link></li>
              <li><Link to="/news" className=" hover-primary">News</Link></li>
              <li><Link to="/contact" className=" hover-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Products/Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-300">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className=" hover-primary">Our Products</Link></li>
              <li><Link to="/features" className=" hover-primary">Features</Link></li>
              <li><Link to="/pricing" className=" hover-primary">Pricing</Link></li>
              <li><Link to="/demo" className=" hover-primary">Demo</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-300">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className=" hover-primary">Help Center</Link></li>
              <li><Link to="/documentation" className=" hover-primary">Documentation</Link></li>
              <li><Link to="/community" className=" hover-primary">Community</Link></li>
              <li><Link to="/support" className=" hover-primary">Contact Support</Link></li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-300">Stay Connected</h3>
            <div className="flex space-x-4 mb-4">
              <Link to="#" className=" hover-primary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-sm ">Subscribe to our newsletter</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <button className="footer-btn-primary px-4 py-2 text-sm rounded-r-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm ">
                © {new Date().getFullYear()} Your Company Name. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <Link to="/privacy" className="text-sm  hover-primary">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-sm  hover-primary">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-sm  hover-primary">
                  Cookie Policy
                </Link>
              </div>
            </div>
            
            {/* Back to Top Button */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className=" hover-primary"
              aria-label="Back to top"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;