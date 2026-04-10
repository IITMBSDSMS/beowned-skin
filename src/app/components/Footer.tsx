import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#09090b] text-white pt-24 pb-10 border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 md:gap-8 mb-16 font-inter">

        {/* BRAND */}
        <div className="md:col-span-2 pr-4 md:pr-12">
          <h2 className="text-2xl font-poppins font-bold tracking-tight mb-6 text-white">
            BeOwned Skin
          </h2>
          <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-8">
            Elevating your daily routine through science-backed formulations. Designed for visible, lasting results. Real skin, real glow.
          </p>
          <div className="relative max-w-sm group">
            <input 
              type="email" 
              placeholder="Join our newsletter" 
              className="w-full bg-transparent border-b border-gray-600 py-3 pr-10 focus:outline-none focus:border-primary text-sm transition-colors text-white placeholder:text-gray-500"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary hover:text-white transition-colors">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* EXPLORE */}
        <div>
          <h3 className="text-xs font-bold mb-6 tracking-widest text-gray-500 uppercase">
            Explore
          </h3>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><Link href="/shop" className="hover:text-primary transition-colors">Shop All</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
            <li><Link href="/beowned-ai" className="hover:text-primary transition-colors">AI Skin Test</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-xs font-bold mb-6 tracking-widest text-gray-500 uppercase">
            Connect
          </h3>
          <div className="flex gap-4 mb-8">
            <a href="https://www.instagram.com/beownedskin.in/" target="_blank" className="w-10 h-10 rounded-full bg-black/50 border border-gray-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 hover:-translate-y-1">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm4.25 5a5 5 0 110 10 5 5 0 010-10zm6-1.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/beowned-skin/?viewAsMember=true" target="_blank" className="w-10 h-10 rounded-full bg-black/50 border border-gray-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 hover:-translate-y-1">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v14h-4V8zm7 0h3.6v1.9h.05c.5-.9 1.7-1.9 3.5-1.9 3.75 0 4.45 2.45 4.45 5.65V22h-4v-6.7c0-1.6-.03-3.65-2.22-3.65-2.23 0-2.57 1.74-2.57 3.53V22h-4V8z"/>
              </svg>
            </a>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            <a href="mailto:support@beownedskin.co" className="hover:text-primary transition-colors">support@beownedskin.co</a><br/>
            +91 98765 43210
          </p>
        </div>

      </div>

      {/* LEGAL */}
      <div className="max-w-7xl mx-auto px-6 border-t border-gray-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-inter">
        <p>© {new Date().getFullYear()} Beowned Skin. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          <Link href="/refund-policy" className="hover:text-gray-300 transition-colors">Refund</Link>
        </div>
      </div>

    </footer>
  );
}