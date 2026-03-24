// src/pages/Search/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { Search, BookOpen, Truck, Wrench, ArrowRight } from 'lucide-react';

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [activeTab, setActiveTab] = useState('all');
  const [results, setResults] = useState({ guides: [], suppliers: [], tools: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ guides: [], suppliers: [], tools: [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would fetch from your data
      setResults({
        guides: [],
        suppliers: [],
        tools: []
      });
      setLoading(false);
    }, 500);
  }, [query]);

  const getTotalCount = () => {
    return results.guides.length + results.suppliers.length + results.tools.length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Search Results {query && `for "${query}"`}
        </h1>
        <p className="text-gray-600 mb-8">
          Found {getTotalCount()} results
        </p>

        {!query ? (
          <div className="text-center py-20">
            <Search size={64} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter a search term</h2>
          </div>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : getTotalCount() === 0 ? (
          <div className="text-center py-20">
            <Search size={64} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No results found</h2>
            <p className="text-gray-600">Try different keywords or check your spelling</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All Results ({getTotalCount()})
              </button>
              <button
                onClick={() => setActiveTab('guides')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'guides'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Guides ({results.guides.length})
              </button>
              <button
                onClick={() => setActiveTab('suppliers')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'suppliers'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Suppliers ({results.suppliers.length})
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'tools'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Tools ({results.tools.length})
              </button>
            </div>

            {/* Results sections - implement based on your data */}
            {activeTab === 'all' && (
              <div className="space-y-6">
                {results.guides.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <BookOpen size={20} className="text-blue-600" />
                      Guides
                    </h2>
                    {/* Map through guides */}
                  </div>
                )}
                {results.suppliers.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Truck size={20} className="text-green-600" />
                      Suppliers
                    </h2>
                    {/* Map through suppliers */}
                  </div>
                )}
                {results.tools.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Wrench size={20} className="text-purple-600" />
                      Tools
                    </h2>
                    {/* Map through tools */}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;