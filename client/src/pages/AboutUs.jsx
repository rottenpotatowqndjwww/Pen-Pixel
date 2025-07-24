import React, { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CreditCard,
  RefreshCw,
  MessageCircle,
  HelpCircle
} from 'lucide-react'

const AboutUs = ({
  brand = 'Pen Pixel',
  supportEmail = 'support@example.com',
  businessEmail = 'business@example.com',
  phone = '+977-9800000000',
  address = '123 Default Street, Kathmandu, Nepal',
  type = 'blog' // or 'ecommerce'
}) => {
  const [activeSection, setActiveSection] = useState('contact-us')

  const sections = [
    { id: 'contact-us', title: 'Contact Us', icon: MessageCircle },
    { id: 'faqs', title: 'FAQs', icon: HelpCircle },
    ...(type === 'ecommerce'
      ? [
          { id: 'returns', title: 'Returns & Refunds', icon: RefreshCw },
          { id: 'payment-methods', title: 'Payment Methods', icon: CreditCard }
        ]
      : [])
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-4">
          <div className="flex flex-wrap gap-1 justify-center md:justify-start">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  {section.title}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12">
        {/* Contact Us Section */}
        {activeSection === 'contact-us' && (
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                At {brand}, we believe in staying connected. Whether you have a question,
                feedback, or just want to say hello, we’re here for you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Mail className="text-black mb-4" size={24} />
                <h4 className="font-semibold text-gray-900 mb-2">Customer Support</h4>
                <p className="text-gray-600">{supportEmail}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Phone className="text-black mb-4" size={24} />
                <h4 className="font-semibold text-gray-900 mb-2">Helpline</h4>
                <p className="text-gray-600">{phone}</p>
                <p className="text-gray-500 text-sm mt-1">9 AM – 9 PM daily</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Clock className="text-black mb-4" size={24} />
                <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
                <p className="text-gray-600">Available during business hours</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Mail className="text-black mb-4" size={24} />
                <h4 className="font-semibold text-gray-900 mb-2">Business Inquiries</h4>
                <p className="text-gray-600">{businessEmail}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-2">
                <MapPin className="text-black mb-4" size={24} />
                <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                <p className="text-gray-600">{address}</p>
              </div>
            </div>

            <div className="bg-black border border-green-200 rounded-lg p-6">
              <p className="text-white">
                You can also reach out to us through our social media handles. We typically
                respond within a few hours.
              </p>
            </div>
          </section>
        )}

        {/* FAQs Section */}
        {activeSection === 'faqs' && (
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">Answers to questions we often get asked.</p>
            </div>

            <div className="space-y-6">
              {(type === 'ecommerce'
                ? [
                    {
                      q: 'What areas do you deliver to?',
                      a: 'We currently deliver across Kathmandu Valley and are expanding to other cities soon.'
                    },
                    {
                      q: 'Can I schedule a delivery time?',
                      a: 'Yes, you can choose from morning, afternoon, or evening slots at checkout.'
                    },
                    {
                      q: 'Is there a delivery fee?',
                      a: 'Orders above NPR 1,000 are free. A NPR 75 fee applies otherwise.'
                    }
                  ]
                : [
                    {
                      q: 'What kind of content does Pen Pixel publish?',
                      a: 'We publish high-quality blogs on creativity, design, tech, and lifestyle.'
                    },
                    {
                      q: 'Can I contribute to Pen Pixel?',
                      a: 'Yes! We welcome guest writers. Email us your pitch at content@penpixel.com.'
                    },
                    {
                      q: 'Do you offer a newsletter?',
                      a: 'Absolutely. Subscribe to get handpicked blogs every week in your inbox.'
                    }
                  ]
              ).map((faq, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{faq.q}</h4>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Returns & Refunds Section */}
        {activeSection === 'returns' && type === 'ecommerce' && (
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Return & Refund Policy</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Not satisfied with your order? Here’s how we can help.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Eligibility',
                  content:
                    'Request returns for items that are damaged, expired, incorrect, or defective.'
                },
                {
                  title: 'Time Frame',
                  content: 'Report issues within 7 days of delivery.'
                },
                {
                  title: 'Unacceptable Returns',
                  content: 'Opened food items and used products cannot be returned.'
                },
                {
                  title: 'Return Process',
                  content:
                    'Contact support with your order number and photo evidence. We’ll guide you through the process.'
                },
                {
                  title: 'Refund Method',
                  content:
                    'Refunds are processed to the original payment method or wallet credit.'
                },
                {
                  title: 'Processing Time',
                  content: '3–5 business days after receiving and inspecting the returned item.'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Payment Methods Section */}
        {activeSection === 'payment-methods' && type === 'ecommerce' && (
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Methods</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {brand} supports multiple payment options for your convenience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Cash on Delivery',
                  content: 'Pay by cash at the time of delivery. Available in most areas.'
                },
                {
                  title: 'Digital Wallets',
                  content: 'eSewa, Khalti, and other major Nepali wallets are supported.'
                },
                {
                  title: 'Cards',
                  content: 'Visa, MasterCard payments are processed securely with OTP verification.'
                },
                {
                  title: 'Bank Transfer',
                  content: 'Transfer to our account and send us the receipt for confirmation.'
                },
                {
                  title: 'Wallet Credit',
                  content: 'Use your earned cashback credits on your next purchase.'
                }
              ].map((method, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">{method.title}</h4>
                  <p className="text-gray-600">{method.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default AboutUs
