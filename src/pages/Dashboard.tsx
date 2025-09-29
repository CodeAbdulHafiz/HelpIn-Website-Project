import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  User, Edit3, Save, X, Eye, TrendingUp, Star, 
  Phone, Mail, MessageCircle, MapPin 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceProvider } from '../types';

export function Dashboard() {
  const { state, updateProvider } = useApp();
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    phone: '',
    whatsapp: '',
    email: '',
    location: '',
  });

  useEffect(() => {
    if (state.currentUser && state.currentUser.type === 'provider') {
      const userProvider = state.providers.find(p => p.userId === state.currentUser?.id);
      if (userProvider) {
        setProvider(userProvider);
        setFormData({
          name: userProvider.name,
          category: userProvider.category,
          description: userProvider.description,
          phone: userProvider.phone,
          whatsapp: userProvider.whatsapp || '',
          email: userProvider.email,
          location: userProvider.location,
        });
      }
    }
  }, [state.currentUser, state.providers]);

  if (!state.currentUser || state.currentUser.type !== 'provider') {
    return <Navigate to="/login" replace />;
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Provider Profile Not Found</h2>
          <p className="text-gray-600 mt-2">There seems to be an issue with your provider profile.</p>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    const updatedProvider: ServiceProvider = {
      ...provider,
      ...formData,
    };
    updateProvider(updatedProvider);
    setProvider(updatedProvider);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: provider.name,
      category: provider.category,
      description: provider.description,
      phone: provider.phone,
      whatsapp: provider.whatsapp || '',
      email: provider.email,
      location: provider.location,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your profile and track your performance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User size={24} className="text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                    <p className="text-gray-600">Update your service details</p>
                  </div>
                </div>
                
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit3 size={16} className="mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={16} className="mr-2" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <X size={16} className="mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-lg">{provider.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    {isEditing ? (
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {state.categories.map(category => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-lg">{provider.category}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center px-3 py-2 bg-gray-50 rounded-lg">
                        <Phone size={16} className="mr-2 text-gray-500" />
                        {provider.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp (Optional)
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center px-3 py-2 bg-gray-50 rounded-lg">
                        <MessageCircle size={16} className="mr-2 text-gray-500" />
                        {provider.whatsapp || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center px-3 py-2 bg-gray-50 rounded-lg">
                        <Mail size={16} className="mr-2 text-gray-500" />
                        {provider.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center px-3 py-2 bg-gray-50 rounded-lg">
                        <MapPin size={16} className="mr-2 text-gray-500" />
                        {provider.location || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Description
                  </label>
                  {isEditing ? (
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your services..."
                    />
                  ) : (
                    <p className="px-3 py-2 bg-gray-50 rounded-lg min-h-[100px]">
                      {provider.description || 'No description provided'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Performance Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Eye className="text-blue-600 mr-2" size={20} />
                    <span className="text-gray-700">Profile Views</span>
                  </div>
                  <span className="font-semibold text-gray-900">{provider.profileViews}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="text-green-600 mr-2" size={20} />
                    <span className="text-gray-700">Search Results</span>
                  </div>
                  <span className="font-semibold text-gray-900">{provider.searches}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="text-yellow-600 mr-2" size={20} />
                    <span className="text-gray-700">Rating</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {provider.rating > 0 ? provider.rating.toFixed(1) : 'No ratings'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageCircle className="text-purple-600 mr-2" size={20} />
                    <span className="text-gray-700">Reviews</span>
                  </div>
                  <span className="font-semibold text-gray-900">{provider.reviewCount}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <a
                  href={`/provider/${provider.id}`}
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Public Profile
                </a>
                
                <button className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Share Profile
                </button>
                
                <button className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Export Data
                </button>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Verification</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    provider.isVerified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {provider.isVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Profile Complete</span>
                  <span className="text-sm font-medium text-gray-900">
                    {provider.description && provider.location ? '100%' : '80%'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}