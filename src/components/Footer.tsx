import React from 'react';
import { Mountain, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  language: string;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const translations = {
    english: {
      tagline: "Preserving Spiritual Heritage Through Digital Innovation",
      quickLinks: "Quick Links",
      home: "Home",
      virtualTours: "Virtual Tours",
      map: "Interactive Map",
      archives: "Digital Archives",
      audioGuide: "Audio Guide",
      calendar: "Cultural Calendar",
      community: "Community",
      contact: "Contact",
      phone: "+91-3592-123456",
      email: "info@monastery360.com",
      address: "Gangtok, Sikkim, India",
      support: "Support",
      help: "Help Center",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      accessibility: "Accessibility",
      followUs: "Follow Us",
      newsletter: "Subscribe to Newsletter",
      emailPlaceholder: "Enter your email",
      subscribe: "Subscribe",
      copyright: "© 2024 Monastery360. All rights reserved.",
      credits: "Built with respect for Sikkim's sacred heritage."
    },
    nepali: {
      tagline: "डिजिटल नवाचारको माध्यमबाट आध्यात्मिक सम्पदाको संरक्षण",
      quickLinks: "द्रुत लिङ्कहरू",
      home: "घर",
      virtualTours: "भर्चुअल टुरहरू",
      map: "अन्तरक्रियात्मक नक्सा",
      archives: "डिजिटल अभिलेखागार",
      audioGuide: "अडियो गाइड",
      calendar: "सांस्कृतिक पंचांग",
      community: "समुदाय",
      contact: "सम्पर्क",
      phone: "+91-3592-123456",
      email: "info@monastery360.com",
      address: "गंगटोक, सिक्किम, भारत",
      support: "सहयोग",
      help: "सहायता केन्द्र",
      privacy: "गोपनीयता नीति",
      terms: "सेवाका सर्तहरू",
      accessibility: "पहुँच",
      followUs: "हामीलाई फलो गर्नुहोस्",
      newsletter: "न्यूजलेटर सब्स्क्राइब गर्नुहोस्",
      emailPlaceholder: "आफ्नो इमेल प्रविष्ट गर्नुहोस्",
      subscribe: "सब्स्क्राइब गर्नुहोस्",
      copyright: "© 2024 Monastery360. सबै अधिकार सुरक्षित।",
      credits: "सिक्किमको पवित्र सम्पदाको सम्मानमा निर्मित।"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  return (
    <footer className="bg-monastery-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-3">
                <Mountain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Monastery360</h3>
                <p className="text-xs text-monastery-gold">Digital Heritage Platform</p>
              </div>
            </div>
            <p className="text-sm text-gray-200 mb-6 leading-relaxed">
              {t.tagline}
            </p>
            
            {/* Social Links */}
            <div>
              <h4 className="text-monastery-gold font-semibold mb-3">{t.followUs}</h4>
              <div className="flex space-x-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-monastery-gold font-semibold mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: t.home, href: "#" },
                { label: t.virtualTours, href: "#" },
                { label: t.map, href: "#" },
                { label: t.archives, href: "#" },
                { label: t.audioGuide, href: "#" },
                { label: t.calendar, href: "#" },
                { label: t.community, href: "#" }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-200 hover:text-monastery-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-monastery-gold font-semibold mb-4">{t.contact}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-monastery-gold mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-200">{t.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-monastery-gold mr-2" />
                <a href={`tel:${t.phone}`} className="text-gray-200 hover:text-monastery-gold transition-colors">
                  {t.phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-monastery-gold mr-2" />
                <a href={`mailto:${t.email}`} className="text-gray-200 hover:text-monastery-gold transition-colors">
                  {t.email}
                </a>
              </div>
            </div>

            {/* Support Links */}
            <div className="mt-6">
              <h4 className="text-monastery-gold font-semibold mb-3">{t.support}</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: t.help, href: "#" },
                  { label: t.privacy, href: "#" },
                  { label: t.terms, href: "#" },
                  { label: t.accessibility, href: "#" }
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-200 hover:text-monastery-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-monastery-gold font-semibold mb-4">{t.newsletter}</h4>
            <p className="text-sm text-gray-200 mb-4">
              Stay updated with monastery events and cultural celebrations.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                className="px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-monastery-gold focus:border-transparent"
              />
              <button className="bg-monastery-gold hover:bg-amber-500 text-monastery-primary px-4 py-2 rounded-lg font-medium transition-colors">
                {t.subscribe}
              </button>
            </div>

            {/* Awards/Recognition */}
            <div className="mt-6 p-3 bg-white bg-opacity-10 rounded-lg">
              <p className="text-xs text-gray-200 text-center">
                🏆 Digital Heritage Award 2024
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white border-opacity-20 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300 mb-4 md:mb-0">
            {t.copyright}
          </p>
          <p className="text-sm text-monastery-gold font-medium">
            {t.credits}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;