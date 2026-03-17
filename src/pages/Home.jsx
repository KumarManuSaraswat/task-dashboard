import { useState, useEffect } from 'react';

const Home = () => {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAdvice = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      setAdvice(data.slip.advice);
      setError('');
    } catch (err) {
      setError('Failed to fetch advice. Please try refreshing.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
        Welcome to Task Dashboard
      </h1>
      
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Daily Advice</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <blockquote className="text-lg italic text-gray-600 leading-relaxed">
            "{advice}"
          </blockquote>
        )}
        
        <button
          onClick={fetchAdvice}
          disabled={loading}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          Get New Advice
        </button>
      </div>
    </div>
  );
};

export default Home;
