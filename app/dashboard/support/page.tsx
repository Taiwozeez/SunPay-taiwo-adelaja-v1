import { ContactCard } from "../../components/Support/contact-card"
import { SupportForm } from "../../components/Support/support-form"

export default function SupportPage() {
  return (
    <div className="p-4 sm:p-5 md:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto px-2 sm:px-4">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl sm:rounded-2xl mb-4 shadow-lg">
          <svg width="28" height="28" className="sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0z" />
          </svg>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">How Can We Help You?</h1>
        <p className="text-sm sm:text-base text-gray-500 px-2 sm:px-0">Our support team is here to assist you with any questions or issues.</p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <ContactCard
          icon={
            <svg width="24" height="24" className="sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          }
          title="Customer Care Hotline"
          value="+234 800 123 4567"
          subtext="Mon - Fri, 8AM - 6PM"
          href="tel:+2348001234567"
        />

        <ContactCard
          icon={
            <svg width="24" height="24" className="sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          }
          title="WhatsApp Support"
          value="+234 901 234 5678"
          subtext="Quick responses, 24/7"
          href="https://wa.me/2349012345678"
          bgColor="bg-green-50"
        />

        <ContactCard
          icon={
            <svg width="24" height="24" className="sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
          title="Email Support"
          value="support@solarcompany.com"
          subtext="For complaints & inquiries"
          href="mailto:support@solarcompany.com"
        />
      </div>

      {/* FAQ Quick Links & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
        {/* FAQ Quick Links */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <svg width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Frequently Asked Questions
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                "How do I check my payment status?",
                "How to add money to my wallet?",
                "What if my payment fails?",
                "How to update my account details?",
                "How do I download payment receipts?",
              ].map((question, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 hover:bg-amber-50 rounded-lg sm:rounded-xl text-sm text-gray-700 hover:text-amber-700 transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2 text-xs sm:text-sm">{question}</span>
                  <svg
                    width="14" height="14" 
                    className="sm:w-4 sm:h-4 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
              <svg width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              Operating Hours
            </h3>
            <div className="space-y-2 sm:space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-300 text-xs sm:text-sm">Monday - Friday</span>
                <span className="text-amber-400 font-medium text-xs sm:text-sm">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-300 text-xs sm:text-sm">Saturday</span>
                <span className="text-amber-400 font-medium text-xs sm:text-sm">9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-300 text-xs sm:text-sm">Sunday</span>
                <span className="text-red-400 font-medium text-xs sm:text-sm">Closed</span>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 p-3 bg-amber-400/10 rounded-lg sm:rounded-xl border border-amber-400/20">
              <p className="text-xs sm:text-sm text-amber-200">
                <span className="font-semibold">Note:</span> WhatsApp support is available 24/7 for urgent issues.
              </p>
            </div>
          </div>
        </div>

        {/* Support Form */}
        <div className="lg:col-span-3">
          <SupportForm />
        </div>
      </div>
    </div>
  )
}