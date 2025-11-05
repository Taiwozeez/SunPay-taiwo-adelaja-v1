// import Header from '@/components/Header'
import ServicesHero from "../components/Services/ServiceHero"
import OurServices from "../components/Services/OurServices"
import FAQ from "../components/Home/CTA2"
import RequestQuota from "../components/Services/RequestQuota"

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
        <ServicesHero />
        <OurServices />
        <FAQ />
        <RequestQuota />
    </div>
  )
}
