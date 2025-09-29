import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Star, Phone, Mail, MessageCircle, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceProvider, SearchFilters } from '../types';

export function Search() {
  const { state } = useApp();
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: '',
    category: '',
    location: '',
    minRating: 0,
  });

  useEffect(() => {
    // Get category from URL params if present
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, []);

  useEffect(() => {
    let filtered = state.providers;

    if (filters.keyword) {
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        provider.description.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(provider =>
        provider.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.location) {
      filtered = filtered.filter(provider =>
        provider.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter(provider => provider.rating >= filters.minRating);
    }

    setFilteredProviders(filtered);
  }, [state.providers, filters]);

  const handleFilterChange = (key: keyof SearchFilters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      keyword: '',
      category: '',
      location: '',
      minRating: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Services</h1>
          
          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search services..."
                value={filters.keyword}
                onChange={(e) => handleFilterChange('keyword', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {state.categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} className="mr-2" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={4}>4+ Stars</option>
                    <option value={4.5}>4.5+ Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredProviders.length} Service{filteredProviders.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        {filteredProviders.length === 0 ? (
          <div className="text-center py-12">
            <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map(provider => (
              <div key={provider.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {provider.name}
                    </h3>
                    <p className="text-sm text-blue-600 mb-2">{provider.category}</p>
                    {provider.rating > 0 && (
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < provider.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {provider.rating.toFixed(1)} ({provider.reviewCount} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                  {provider.isVerified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{provider.description}</p>

                {provider.location && (
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin size={14} className="mr-1" />
                    {provider.location}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  <a
                    href={`tel:${provider.phone}`}
                    className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    <Phone size={14} className="mr-1" />
                    Call
                  </a>
                  
                  <a
                    href={`mailto:${provider.email}`}
                    className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors"
                  >
                    <Mail size={14} className="mr-1" />
                    Email
                  </a>
                  
                  {provider.whatsapp && (
                    <a
                      href={`https://wa.me/${provider.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors"
                    >
                      <MessageCircle size={14} className="mr-1" />
                      WhatsApp
                    </a>
                  )}
                </div>

                <Link
                  to={`/provider/${provider.id}`}
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}