import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#EAE7E2] mt-32 border-t border-gray-200">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

        {/* BRAND */}
        <div>
          <h2 className="text-lg font-medium mb-4 tracking-wider">
            BEOWNED SKIN
          </h2>
          <p className="text-gray-600 text-sm">
            Science-backed skincare designed for real results.
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-sm font-medium mb-4 uppercase tracking-wide">
            Contact
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            Email: support@beownedskin.co
          </p>
          <p className="text-gray-600 text-sm">
            Phone: +91 98765 43210
          </p>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-sm font-medium mb-4 uppercase tracking-wide">
            Follow Us
          </h3>

          <div className="flex gap-4">

            {/* Instagram */}
            <a href="https://www.instagram.com/beownedskin.in/" target="_blank" className="hover:scale-110 transition">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm4.25 5a5 5 0 110 10 5 5 0 010-10zm6-1.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/beowned-skin/?viewAsMember=true" target="_blank" className="hover:scale-110 transition">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v14h-4V8zm7 0h3.6v1.9h.05c.5-.9 1.7-1.9 3.5-1.9 3.75 0 4.45 2.45 4.45 5.65V22h-4v-6.7c0-1.6-.03-3.65-2.22-3.65-2.23 0-2.57 1.74-2.57 3.53V22h-4V8z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/beownedskin" target="_blank" className="hover:scale-110 transition">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12.1C22 6.6 17.5 2 12 2S2 6.6 2 12.1c0 5 3.7 9.2 8.5 10v-7H8v-3h2.5V9.8c0-2.5 1.5-3.8 3.7-3.8 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 3h-2.4v7c4.8-.8 8.5-5 8.5-10z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a href="#" className="hover:scale-110 transition">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C17.6 2.5 12 2.5 12 2.5h0s-5.6 0-8.6.4c-.4.1-1.3.1-2.1 1-.6.7-.8 2.3-.8 2.3S0 8.1 0 10v1.9c0 1.9.5 3.8.5 3.8s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.3.4 7.3.4s5.6 0 8.6-.4c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.5-1.9.5-3.8V10c0-1.9-.5-3.8-.5-3.8zM9.5 14.6V7.4l6.3 3.6-6.3 3.6z"/>
              </svg>
            </a>

          </div>
        </div>

      </div>

      {/* LEGAL */}
      <div className="border-t border-gray-300 py-6 text-center text-sm text-gray-500 relative z-10">
        <p>© 2026 Beowned Skin. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-2">
          <Link href="/privacy-policy" className="cursor-pointer hover:text-black">
            Privacy Policy
          </Link>
          <Link href="/terms" className="cursor-pointer hover:text-black">
            Terms of Service
          </Link>
          <Link href="/refund" className="cursor-pointer hover:text-black">
            Refund Policy
          </Link>
        </div>
      </div>

    </footer>
  );
}