import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("English (US)");

  const handleSubscribe = () => {
    if (email.trim()) {
      // Handle subscription logic here
      console.log("Subscribing email:", email);
      setEmail("");
    }
  };

  const offices = [
    {
      city: "NEW YORK",
      address: "Huntersville,",
      address2: "957 Hill Hills Suite 491, United States",
      phone: "+12(3) 456 7890 1234",
      email: "company@name.com",
    },
    {
      city: "ROME",
      address: "Piazza di Spagna,",
      address2: "00187 Roma RM, Italy",
      phone: "+12(3) 456 7890 1234",
      email: "company@name.it",
    },
    {
      city: "LONDON",
      address: "Fulham Rd,",
      address2: "London SW6 1HS, United Kingdom",
      phone: "+12(3) 456 7890 1234",
      email: "company@name.co.uk",
    },
  ];

  return (
    <footer className="bg-purple-300 shadow-2xl rounded dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Offices Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {offices.map((office, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-wide">
                {office.city}
              </h3>

              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <div>
                  <p className="text-sm">{office.address}</p>
                  <p className="text-sm">{office.address2}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <i className="fas fa-phone text-purple-600 w-4"></i>
                  <span className="text-sm">Office: {office.phone}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <i className="fas fa-envelope text-purple-600 w-4"></i>
                  <span className="text-sm">Support: {office.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="md:w-1/3">
              <h4 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                Sign up to our newsletter
              </h4>
            </div>

            <div className="md:w-2/3">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  />
                </div>
                <button
                  onClick={handleSubscribe}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Logo and Copyright */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <NavLink href="#" className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 shadow-lg">
                    <p className=" text-white text-2xl">S</p>
                  </div>
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    Social
                  </span>
                </NavLink>
              </div>

              <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2021-2024 Social™. All Rights Reserved.
              </p>
            </div>

            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <i className="fas fa-globe text-gray-400"></i>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm text-gray-600 dark:text-gray-400 bg-transparent border-none focus:ring-0 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              >
                <option value="English (US)">🇺🇸 English (US)</option>
                <option value="English (UK)">🇬🇧 English (UK)</option>
                <option value="Español">🇪🇸 Español</option>
                <option value="Français">🇫🇷 Français</option>
                <option value="Deutsch">🇩🇪 Deutsch</option>
                <option value="Italiano">🇮🇹 Italiano</option>
                <option value="العربية">🇸🇦 العربية</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
