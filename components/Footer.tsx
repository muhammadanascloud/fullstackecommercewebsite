import { SiX, SiFacebook, SiLinkedin } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 px-8 mt-10">
      <div className="flex justify-between items-start flex-wrap gap-6">
        {/* Brand Description */}
        <div>
          <h2 className="text-xl font-bold">Dine Market</h2>
          <p className="text-gray-500 mt-2">
            Small, artisan label offering a thoughtfully curated collection of
            high-quality essentials.
          </p>
          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <SiX size={24} color="#1DA1F2" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <SiFacebook size={24} color="#1877F2" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <SiLinkedin size={24} color="#0077B5" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="text-gray-500 space-y-2">
            <li>About</li>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul className="text-gray-500 space-y-2">
            <li>Support Center</li>
            <li>24h Service</li>
            <li>Quick Chat</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <ul className="text-gray-500 space-y-2">
            <li>Whatsapp</li>
            <li>Support 24h</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
