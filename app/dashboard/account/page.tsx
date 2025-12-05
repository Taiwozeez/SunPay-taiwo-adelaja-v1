import { PaymentProgressDetail } from "../../components/Account/payment-progress-detail"
import { SolarProductDetail } from "../../components/Account/solar-product-detail"

export default function AccountPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
        <p className="text-gray-600 mt-1">Manage your solar product and payment details</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Payment Progress - Detailed */}
        <PaymentProgressDetail />

        {/* Solar Product - Detailed */}
        <SolarProductDetail />
      </div>
    </div>
  )
}
