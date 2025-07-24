import React, { useState } from "react"
import toast from 'react-hot-toast'

const NewsLetter = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!email) {
            toast.error("Please enter your email address")
            return
        }

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            toast.error("Please enter a valid email address")
            return
        }

        setIsLoading(true)
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            toast.success("Thanks for subscribing! Please check your email regularly to get the latest offers, new arrivals, and exclusive discounts.", {
                duration: 5000
            })
            setEmail('')
        } catch (error) {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="flex flex-col items-center justify-center text-center space-y-8 mt-24 pb-16 px-4 max-w-4xl mx-auto">
            {/* Header Content */}
            <div className="space-y-4">
                <h2 className="md:text-5xl text-3xl font-bold text-gray-900 tracking-tight leading-tight">
                    Never Miss a Blog!
                </h2>
                <p className="md:text-xl text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Subscribe to get the latest blogs, information, and exclusive guides delivered straight to your inbox
                </p>
            </div>
            
            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md mt-8">
                <div className="flex flex-col sm:flex-row shadow-lg rounded-lg overflow-hidden border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all duration-300 hover:shadow-xl">
                    <input
                        className="flex-1 px-4 py-4 text-gray-700 placeholder-gray-400 bg-transparent border-0 outline-none text-base transition-all duration-200"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        disabled={isLoading}
                        aria-label="Email address for newsletter subscription"
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="px-6 sm:px-8 py-4 text-white bg-primary hover:bg-primary-dark 
                                 font-semibold transition-all duration-200 
                                 transform hover:scale-105 active:scale-95
                                 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                                 whitespace-nowrap min-w-[120px] flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Subscribing...
                            </>
                        ) : (
                            <>
                                Subscribe
                                <svg className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
                                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </form>
            
            {/* Privacy Notice */}
            <p className="text-sm text-gray-500 mt-6 max-w-md mx-auto leading-relaxed">
                By subscribing, you agree to our{' '}
                <button className="text-primary hover:text-primary-dark underline transition-colors duration-200 font-medium">
                    Privacy Policy
                </button>
                {' '}and consent to receive updates from our company.
            </p>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>No Spam</span>
                </div>
                <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Unsubscribe Anytime</span>
                </div>
            </div>
        </section>
    )
}

export default NewsLetter