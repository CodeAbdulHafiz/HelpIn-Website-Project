import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Star, Phone, Mail, MessageCircle, MapPin, 
  Calendar, Shield, Eye, TrendingUp 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceProvider, Review } from '../types';

export function ProviderProfile() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: '',
  });

  useEffect(() => {
    if (id) {
      const foundProvider = state.providers.find(p => p.id === id);
      if (foundProvider) {
        setProvider(foundProvider);
        // Increment profile views
        const updatedProvider = { ...foundProvider, profileViews: foundProvider.profileViews + 1 };
        dispatch({ type: 'UPDATE_PROVIDER', payload: updatedProvider });
        
        // Load reviews
        const providerReviews = state.reviews.filter(r => r.providerId === id);
        setReviews(providerReviews);
      }
    }
  }, [id, state.providers, state.reviews, dispatch]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider || !newReview.userName.trim() || !newReview.comment.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      providerId: provider.id,
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_REVIEW', payload: review });
    setReviews(prev => [...prev, review]);

    // Update provider rating
    const allReviews = [...reviews, review];
    const averageRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    const updatedProvider = {
      ...provider,
      rating: averageRating,
      reviewCount: allReviews.length,
    };
    dispatch({ type: 'UPDATE_PROVIDER', payload: updatedProvider });
    setProvider(updatedProvider);

    // Reset form
    setNewReview({ rating: 5, comment: '', userName: '' });
    setShowReviewForm(false);
  };

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Provider Not Found</h2>
          <p className="text-gray-600 mt-2">The service provider you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Provider Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h1 className="text-3xl font-bold text-gray-900 mr-4">{provider.name}</h1>
                {provider.isVerified && (
                  <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    <Shield size={14} className="mr-1" />
                    Verified
                  </div>
                )}
              </div>
              
              <p className="text-lg text-blue-600 mb-4">{provider.category}</p>
              
              {provider.rating > 0 && (
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < provider.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="ml-3 text-lg font-semibold text-gray-900">
                    {provider.rating.toFixed(1)}
                  </span>
                  <span className="ml-2 text-gray-600">
                    ({provider.reviewCount} reviews)
                  </span>
                </div>
              )}

              {provider.location && (
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={16} className="mr-2" />
                  {provider.location}
                </div>
              )}

              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={14} className="mr-1" />
                Joined {new Date(provider.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            {/* Contact Actions */}
            <div className="flex flex-col space-y-3 mt-6 md:mt-0">
              <a
                href={`tel:${provider.phone}`}
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Phone size={18} className="mr-2" />
                Call Now
              </a>
              
              <a
                href={`mailto:${provider.email}`}
                className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail size={18} className="mr-2" />
                Send Email
              </a>
              
              {provider.whatsapp && (
                <a
                  href={`https://wa.me/${provider.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageCircle size={18} className="mr-2" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Eye size={20} className="text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">{provider.profileViews}</span>
              </div>
              <p className="text-sm text-gray-600">Profile Views</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp size={20} className="text-green-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">{provider.searches}</span>
              </div>
              <p className="text-sm text-gray-600">Search Appearances</p>
            </div>
            
            <div className="text-center col-span-2 md:col-span-1">
              <div className="flex items-center justify-center mb-2">
                <Star size={20} className="text-yellow-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">{provider.reviewCount}</span>
              </div>
              <p className="text-sm text-gray-600">Total Reviews</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed">
            {provider.description || 'No description available.'}
          </p>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Write Review
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newReview.userName}
                  onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>5 Stars - Excellent</option>
                  <option value={4}>4 Stars - Good</option>
                  <option value={3}>3 Stars - Average</option>
                  <option value={2}>2 Stars - Poor</option>
                  <option value={1}>1 Star - Terrible</option>
                </select>
              </div>
              
              <textarea
                placeholder="Write your review..."
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
                rows={4}
                required
              />
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <Star className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">No reviews yet. Be the first to review this service!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}