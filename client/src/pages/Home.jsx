import React, { useRef } from 'react';
import { PenTool, Sparkles, ArrowRight, FileText, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BlogList from '../components/BlogList';
import NewsLetter from '../components/NewsLetter';
import { useAppContext } from '../context/appContext';

const StepCard = ({ icon: Icon, title, description, color = "blue", step }) => {
  const colorClasses = {
    blue: "bg-blue-100 group-hover:bg-blue-200 text-blue-600",
    purple: "bg-purple-100 group-hover:bg-purple-200 text-purple-600",
    green: "bg-green-100 group-hover:bg-green-200 text-green-600"
  };

  return (
    <div className="group">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100/80 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-white">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colorClasses[color]} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-300`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h3 className="text-gray-900 font-semibold mb-2 text-sm sm:text-base">{step}. {title}</h3>
        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 px-4 py-3 sm:px-6 sm:py-4 font-medium rounded-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base";
  
  const variants = {
    primary: "bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 shadow-sm hover:shadow-md"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Section = ({ children, className = "" }) => (
  <div className={`w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const GradientText = ({ children, className = "" }) => (
  <span className={`bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

const HeroSection = () => (
  <Section className="text-center pt-16 sm:pt-20">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-6 sm:mt-8 mb-4 sm:mb-6 leading-tight px-2">
      Create Blogs with{' '}
      <span className="block mt-1 sm:mt-2">
        <GradientText>AI Assistance</GradientText>
      </span>
    </h1>

    <div className="max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
        Simply write your topic, and our AI will generate comprehensive content to kickstart your blog post.
        Transform your ideas into well-structured articles with intelligent content suggestions.
      </p>
      <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
        Focus on your creativity while AI handles the heavy lifting of content generation.
      </p>
    </div>
  </Section>
);

const HowItWorksSection = () => (
  <Section className="mb-8 sm:mb-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
      <StepCard icon={PenTool} title="Write Your Topic" description="Enter your blog topic or idea" color="blue" step="1" />
      <StepCard icon={Sparkles} title="AI Generates" description="AI creates relevant content instantly" color="purple" step="2" />
      <StepCard icon={FileText} title="Edit & Publish" description="Refine and publish your blog" color="green" step="3" />
    </div>
  </Section>
);

const CTASection = ({ onStartWriting, onLearnMore }) => (
  <Section className="text-center mb-12 sm:mb-16">
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
      <Button variant="primary" className="w-full sm:w-auto group" onClick={onStartWriting}>
        Start Writing with AI
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </Button>
      <Button variant="secondary" className="w-full sm:w-auto" onClick={onLearnMore}>
        Learn More
      </Button>
    </div>
  </Section>
);

const FeatureHighlight = () => (
  <Section className="mb-16 sm:mb-20">
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-100/80 shadow-sm">
        <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Smart Content Generation</h3>
        </div>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base text-center">
          Our AI understands context, maintains your writing style, and generates relevant,
          high-quality content that serves as the perfect starting point for your blog posts.
        </p>
      </div>
    </div>
  </Section>
);

const PlatformIntroSection = ({ inputRef, onSubmitHandler, input, onClear }) => (
  <Section className="text-center">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
      Your Own <GradientText>Blogging Platform</GradientText>
    </h2>
    <div className="max-w-3xl mx-auto space-y-4 mb-6 sm:mb-8 px-2">
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
        This is your dedicated space to think out loud, share what truly matters to you, and write freely without filters or limits.
      </p>
      <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
        From quick updates to deep essays, your writing has a home here.
      </p>
      <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
        With intuitive design and built-in AI assistance, your only focus will be expressing yourself clearly, honestly, and beautifully.
      </p>
    </div>
    <div className="max-w-md sm:max-w-xl mx-auto px-2">
      <form
        onSubmit={onSubmitHandler}
        className="flex overflow-hidden rounded-xl shadow-lg border border-gray-200/80 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300"
      >
        <input
          type="text"
          ref={inputRef}
          placeholder="Search for blogs..."
          className="w-full px-3 py-3 sm:px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm sm:text-base bg-transparent"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-4 sm:px-6 py-3 transition-all duration-300 flex items-center justify-center min-w-fit"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline ml-2">Search</span>
        </button>
      </form>
    </div>
    <div className='text-center'>
      {input && (
        <button 
          onClick={onClear} 
          className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'
        >
          Clear Search
        </button>
      )}
    </div>
  </Section>
);

const Home = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const { setInput, input } = useAppContext(); // Added 'input' here

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const query = inputRef.current.value.trim();
    if (query.length > 0) {
      setInput(query);
    }
  };

  const onClear = () => {
    setInput('');
    inputRef.current.value = '';
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-[100vh]">
      <HeroSection />
      <HowItWorksSection />
      <CTASection
        onStartWriting={() => navigate('/admin')}
        onLearnMore={() => navigate('/about')}
      />
      <FeatureHighlight />
      <PlatformIntroSection 
        inputRef={inputRef} 
        onSubmitHandler={onSubmitHandler}
        input={input}
        onClear={onClear}
      />
      <BlogList />
      <NewsLetter />
    </div>
  );
};

export default Home;