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
    // Simulate API call - replace with your actual data fetching
    setTimeout(() => {
      // Mock data - replace with your actual data
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleItemClick = (type, id) => {
    navigate(`/${type}/${id}`);
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
            <p className="text-gray-500">Use the search bar above to find guides, suppliers, and tools</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : getTotalCount() === 0 ? (
          <div className="text-center py-20">
            <Search size={64} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No results found</h2>
            <p className="text-gray-600 mb-6">Try different keywords or check your spelling</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Home
            </button>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => handleTabChange('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All Results ({getTotalCount()})
              </button>
              <button
                onClick={() => handleTabChange('guides')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'guides'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Guides ({results.guides.length})
              </button>
              <button
                onClick={() => handleTabChange('suppliers')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'suppliers'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Suppliers ({results.suppliers.length})
              </button>
              <button
                onClick={() => handleTabChange('tools')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'tools'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Tools ({results.tools.length})
              </button>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Guides Section */}
              {(activeTab === 'all' || activeTab === 'guides') && results.guides.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-blue-600" />
                    Guides
                  </h2>
                  <div className="space-y-3">
                    {results.guides.map((guide) => (
                      <div
                        key={guide.id}
                        onClick={() => handleItemClick('guides', guide.id)}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                      >
                        <div>
                          <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                            {guide.title}
                          </h3>
                          <p className="text-sm text-gray-600">{guide.description}</p>
                        </div>
                        <ArrowRight size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suppliers Section */}
              {(activeTab === 'all' || activeTab === 'suppliers') && results.suppliers.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Truck size={20} className="text-green-600" />
                    Suppliers
                  </h2>
                  <div className="space-y-3">
                    {results.suppliers.map((supplier) => (
                      <div
                        key={supplier.id}
                        onClick={() => handleItemClick('suppliers', supplier.id)}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                      >
                        <div>
                          <h3 className="font-medium text-gray-800 group-hover:text-green-600 transition-colors">
                            {supplier.name}
                          </h3>
                          <p className="text-sm text-gray-600">{supplier.description}</p>
                        </div>
                        <ArrowRight size={18} className="text-gray-400 group-hover:text-green-600 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools Section */}
              {(activeTab === 'all' || activeTab === 'tools') && results.tools.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Wrench size={20} className="text-purple-600" />
                    Tools
                  </h2>
                  <div className="space-y-3">
                    {results.tools.map((tool) => (
                      <div
                        key={tool.id}
                        onClick={() => handleItemClick('tools', tool.id)}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                      >
                        <div>
                          <h3 className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-gray-600">{tool.description}</p>
                        </div>
                        <ArrowRight size={18} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;