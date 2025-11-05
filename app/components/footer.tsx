"use client"

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="text-black">
      {/* Top Section - Yellow Background */}
      <div className="bg-yellow-500">
        <div className="mx-auto max-w-7xl px-6 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 mb-12">
            {/* Logo and Description */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-4">SunPay</h3>
              <p className="text-sm leading-relaxed text-black/90">
                SunPay makes it effortless to pay directly from your device — whether it's topping up your wallet, sending money to friends, or managing bills. Secure, fast, and designed to simplify your daily financial activities.
              </p>
            </div>

            {/* About Company */}
            <div>
              <h4 className="text-lg font-semibold mb-6">About Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about-us" className="text-black/80 hover:text-black transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black/80 hover:text-black transition-colors">
                    Cookies Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black/80 hover:text-black transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-black/80 hover:text-black transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get In Touch */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Get In Touch</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Image src="/images/clock.png" alt="Clock" width={18} height={18} className="flex-shrink-0" />
                  <span className="text-sm text-black/90">Sun-Fri: 8:00-10:00</span>
                </li>
                <li className="flex items-center gap-3">
                  <Image src="/images/sms.png" alt="Email" width={18} height={18} className="flex-shrink-0" />
                  <a
                    href="mailto:info@example.com"
                    className="text-sm text-black/90 hover:text-black transition-colors"
                  >
                    info@sunpay.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Image src="/images/call.png" alt="Phone" width={18} height={18} className="flex-shrink-0" />
                  <a href="tel:+2348162367679" className="text-sm text-black/90 hover:text-black transition-colors">
                    (+234) 234 567 8901
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Image src="/images/location.png" alt="Location" width={18} height={18} className="flex-shrink-0" />
                  <span className="text-sm text-black/90">Lagos, Nigeria</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider - Moved down closer to social media */}
          <div className="border-t border-black/20 mt-8"></div>
        </div>
      </div>

      {/* Bottom Section - Yellow Background (darker shade) */}
      <div className="bg-yellow-600">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Social Icons */}
            <div className="flex gap-4 mb-4 md:mb-0">
              <a href="#" className="text-black/80 hover:text-black transition-colors">
                <Image src="/images/367593_linkedin_business_network_social_icon 1.png" alt="LinkedIn" width={20} height={20} />
              </a>
              <a href="#" className="text-black/80 hover:text-black transition-colors">
                <Image src="/images/5305153_fb_facebook_facebook logo_icon 1.png" alt="Facebook" width={20} height={20} />
              </a>
              <a href="#" className="text-black/80 hover:text-black transition-colors">
                <Image src="/images/11244080_x_twitter_elon musk_twitter new logo_icon (3) 1.png" alt="Twitter" width={20} height={20} />
              </a>
              <a href="#" className="text-black/80 hover:text-black transition-colors">
                <Image src="/images/8679433_instagram_fill_icon 1.png" alt="Instagram" width={20} height={20} />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-black/90">© 2025 Taiwo Adelaja. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}