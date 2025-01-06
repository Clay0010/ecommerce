import React from 'react'

export const Faq = () => {
  return (
    <div className="w-full py-16">
  <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
  <div className="max-w-3xl mx-auto space-y-4">
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h3 className="font-bold">What is your return policy?</h3>
      <p className="text-gray-600">
        We offer a 30-day return policy with no questions asked.
      </p>
    </div>
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h3 className="font-bold">Do you provide warranty?</h3>
      <p className="text-gray-600">
        Yes, all our products come with a one-year warranty.
      </p>
    </div>
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h3 className="font-bold">Where are your stores located?</h3>
      <p className="text-gray-600">
        We have stores in multiple cities worldwide. Check our store locator
        for details.
      </p>
    </div>
  </div>
</div>

  )
}
