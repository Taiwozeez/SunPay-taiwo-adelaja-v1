// import Header from '@/components/Header'
import Hero from "./components/Home/Hero"
import MakePayment from "./components/Home/MakePayment"
import HowItWorks from "./components/Home/HowItWorks"
import AddMoney from "./components/Home/AddMoney"
// import CTA from "./components/Home/CTA"
// import CTA2 from "./components/Home/CTA2"
// import Testimonies from "./components/Home/Testimonial"
// import FAQ from "./components/Home/FAQ"
// import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}
      <Hero />
      <MakePayment />
      <HowItWorks />
      <AddMoney />
      
      
      {/* <Footer /> */}
    </div>
  )
}
