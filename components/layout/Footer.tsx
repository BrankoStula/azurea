// components/layout/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-brand-black text-cream pt-32 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Edge-to-edge container with generous side padding */}
      <div className="w-full px-4 md:px-12 lg:px-20">
        
        {/* Top Grid — Expanded to 12 columns on desktop for better spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 mb-32">
          
          {/* Col 1: Brand Info (Takes up 4 columns) */}
          <div className="flex flex-col gap-8 lg:col-span-4 lg:pr-12">
            <Link href="/" className="inline-block w-max">
              <Image
                src="/azurea-logo.svg"
                alt="Azurea"
                width={160}
                height={46}
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-cream/60 text-base leading-relaxed max-w-md">
              A curated collection of luxury villas in Munggu, Bali. A private coastal enclave offering high-yield investment and timeless tropical living.
            </p>
          </div>

          {/* Col 2: The Collection (Starts at column 7 to push it to the right) */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-[#C9A55A] text-xs tracking-[0.25em] uppercase font-semibold mb-8">
              The Collection
            </h4>
            <ul className="flex flex-col gap-4 text-cream/70 text-base">
              <li><Link href="/project" className="hover:text-cream transition-colors">The Vision</Link></li>
              <li><Link href="/location" className="hover:text-cream transition-colors">Location</Link></li>
              <li><Link href="/product" className="hover:text-cream transition-colors">The Villas</Link></li>
              <li><Link href="/plans" className="hover:text-cream transition-colors">Interactive Masterplan</Link></li>
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div className="lg:col-span-2">
            <h4 className="text-[#C9A55A] text-xs tracking-[0.25em] uppercase font-semibold mb-8">
              Connect
            </h4>
            <ul className="flex flex-col gap-4 text-cream/70 text-base">
              <li><Link href="/contact" className="hover:text-cream transition-colors">Contact Us</Link></li>
              <li><Link href="/contact" className="hover:text-cream transition-colors">Schedule a Viewing</Link></li>
              <li><a href="mailto:info@azureabali.com" className="hover:text-cream transition-colors">info@azureabali.com</a></li>
              <li><a href="tel:+628111222333" className="hover:text-cream transition-colors">+62 811 1222 333</a></li>
            </ul>
          </div>

          {/* Col 4: Office */}
          <div className="lg:col-span-2">
            <h4 className="text-[#C9A55A] text-xs tracking-[0.25em] uppercase font-semibold mb-8">
              Office
            </h4>
            <address className="text-cream/70 text-base not-italic leading-relaxed">
              Jalan Pantai Seseh<br />
              Munggu, Mengwi<br />
              Badung Regency<br />
              Bali, Indonesia 80351
            </address>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-cream/40 text-sm gap-6 relative z-10">
          <p>© {new Date().getFullYear()} Azurea Estate. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-cream transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-cream transition-colors">Terms of Service</Link>
          </div>
        </div>

        {/* Giant Background Text / Watermark */}
        <div className="mt-8 w-full overflow-hidden flex justify-center items-center opacity-[0.03] select-none pointer-events-none -mb-16">
          <span className="font-display text-[15vw] leading-none whitespace-nowrap tracking-widest uppercase">
            AZUREA
          </span>
        </div>

      </div>
    </footer>
  );
}