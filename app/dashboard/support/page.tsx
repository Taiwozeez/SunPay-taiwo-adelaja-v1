import { ContactCard } from "../../components/Support/contact-card"
import { SupportForm } from "../../components/Support/support-form"
import { 
  FaUsers,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaQuestionCircle,
  FaClock,
  FaChevronRight,
  FaComments
} from "react-icons/fa"

export default function SupportPage() {
  return (
    <div className="p-4 sm:p-5 md:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto px-2 sm:px-4">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl sm:rounded-2xl mb-4 shadow-lg">
          <FaUsers className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">How Can We Help You?</h1>
        <p className="text-sm sm:text-base text-gray-500 px-2 sm:px-0">Our support team is here to assist you with any questions or issues.</p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <ContactCard
          icon={<FaPhoneAlt className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600" />}
          title="Customer Care Hotline"
          value="+234 802 772 3084"
          subtext="Mon - Fri, 8AM - 6PM"
          href="tel:+2348027723084"
        />

        <ContactCard
          icon={<FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />}
          title="WhatsApp Support"
          value="+234 802 772 3084"
          subtext="Quick responses, 24/7"
          href="https://wa.me/2348027723084"
        />

        <ContactCard
          icon={<FaEnvelope className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600" />}
          title="Email Support"
          value="support@sunpay.com"
          subtext="For complaints & inquiries"
          href="mailto:support@sunpay.com"
        />
      </div>

      {/* FAQ Quick Links & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
        {/* FAQ Quick Links */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <FaQuestionCircle className="w-5 h-5 text-amber-600" />
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
                  <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-gray-400 group-hover:text-amber-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
              <FaClock className="w-5 h-5 text-amber-400" />
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