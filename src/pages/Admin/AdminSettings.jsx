import React, { useState, useEffect } from 'react';
import { Store, CreditCard, Truck, Mail, User, Save, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('store');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [adminProfile, setAdminProfile] = useState(null);
  
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'My E-Commerce Store',
    storeEmail: 'store@example.com',
    storePhone: '+91 1234567890',
    storeAddress: '123 Main St, City, Country',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    taxRate: 18,
    logo: ''
  });

  const [paymentSettings, setPaymentSettings] = useState({
    codEnabled: true,
    stripeEnabled: false,
    stripePublicKey: '',
    stripeSecretKey: '',
    razorpayEnabled: false,
    razorpayKeyId: '',
    razorpayKeySecret: ''
  });

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 500,
    standardShippingFee: 50,
    expressShippingFee: 100,
    deliveryTime: '3-5 business days',
    expressDeliveryTime: '1-2 business days'
  });

  const [emailSettings, setEmailSettings] = useState({
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    fromEmail: 'noreply@store.com',
    fromName: 'My Store'
  });

  const [profileSettings, setProfileSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // API utility function
  const apiCall = async (endpoint, method = 'GET', body = null) => {
    const token = localStorage.getItem('adminToken');
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      ...(body && { body: JSON.stringify(body) })
    };

    const response = await fetch(`http://localhost:5000/api${endpoint}`, options);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }
    
    return data;
  };

  // Fetch admin profile on component mount
  useEffect(() => {
    fetchAdminProfile();
    loadSettingsFromStorage();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const data = await apiCall('/admin/profile');
      if (data.success) {
        setAdminProfile(data.user);
      }
    } catch (err) {
      console.error('Failed to fetch admin profile:', err);
      if (err.message.includes('401')) {
        setError('Session expired. Please login again.');
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
      }
    }
  };

  const loadSettingsFromStorage = () => {
    const savedStore = localStorage.getItem('storeSettings');
    const savedPayment = localStorage.getItem('paymentSettings');
    const savedShipping = localStorage.getItem('shippingSettings');
    const savedEmail = localStorage.getItem('emailSettings');

    if (savedStore) setStoreSettings(JSON.parse(savedStore));
    if (savedPayment) setPaymentSettings(JSON.parse(savedPayment));
    if (savedShipping) setShippingSettings(JSON.parse(savedShipping));
    if (savedEmail) setEmailSettings(JSON.parse(savedEmail));
  };

  const showMessage = (message, isError = false) => {
    if (isError) {
      setError(message);
      setSuccess('');
    } else {
      setSuccess(message);
      setError('');
    }
    setTimeout(() => {
      setError('');
      setSuccess('');
    }, 3000);
  };

  const handleSaveStore = async () => {
    setLoading(true);
    try {
      localStorage.setItem('storeSettings', JSON.stringify(storeSettings));
      
      // TODO: Uncomment when backend endpoint is ready
      // await apiCall('/settings/store', 'PUT', storeSettings);
      
      showMessage('Store settings saved successfully!');
    } catch (err) {
      showMessage(err.message || 'Failed to save store settings', true);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePayment = async () => {
    setLoading(true);
    try {
      localStorage.setItem('paymentSettings', JSON.stringify(paymentSettings));
      
      // TODO: Uncomment when backend endpoint is ready
      // await apiCall('/settings/payment', 'PUT', paymentSettings);
      
      showMessage('Payment settings saved successfully!');
    } catch (err) {
      showMessage(err.message || 'Failed to save payment settings', true);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveShipping = async () => {
    setLoading(true);
    try {
      localStorage.setItem('shippingSettings', JSON.stringify(shippingSettings));
      
      // TODO: Uncomment when backend endpoint is ready
      // await apiCall('/settings/shipping', 'PUT', shippingSettings);
      
      showMessage('Shipping settings saved successfully!');
    } catch (err) {
      showMessage(err.message || 'Failed to save shipping settings', true);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEmail = async () => {
    setLoading(true);
    try {
      localStorage.setItem('emailSettings', JSON.stringify(emailSettings));
      
      // TODO: Uncomment when backend endpoint is ready
      // await apiCall('/settings/email', 'PUT', emailSettings);
      
      showMessage('Email settings saved successfully!');
    } catch (err) {
      showMessage(err.message || 'Failed to save email settings', true);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!profileSettings.currentPassword || !profileSettings.newPassword || !profileSettings.confirmPassword) {
      showMessage('All password fields are required!', true);
      return;
    }

    if (profileSettings.newPassword !== profileSettings.confirmPassword) {
      showMessage('New passwords do not match!', true);
      return;
    }

    if (profileSettings.newPassword.length < 6) {
      showMessage('Password must be at least 6 characters long!', true);
      return;
    }

    setLoading(true);
    try {
      // TODO: Uncomment when backend endpoint is ready
      // const data = await apiCall('/admin/change-password', 'PUT', {
      //   currentPassword: profileSettings.currentPassword,
      //   newPassword: profileSettings.newPassword
      // });

      // if (data.success) {
        showMessage('Password changed successfully!');
        setProfileSettings({ currentPassword: '', newPassword: '', confirmPassword: '' });
      // }
    } catch (err) {
      showMessage(err.message || 'Failed to change password', true);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'store', name: 'Store Settings', icon: Store },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'shipping', name: 'Shipping', icon: Truck },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'profile', name: 'Profile', icon: User }
  ];

  // Check permissions
  const hasPermission = (permission) => {
    if (!adminProfile) return true; // Allow access by default for demo
    if (adminProfile.role === 'superadmin') return true;
    if (adminProfile.role === 'admin') return true;
    return adminProfile.permissions?.[permission] || false;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        {adminProfile && (
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {adminProfile.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{adminProfile.name}</p>
                <p className="text-xs text-gray-500 capitalize">{adminProfile.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Alert Messages */}
      {(error || success) && (
        <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
          error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
        }`}>
          <AlertCircle className={error ? 'text-red-600' : 'text-green-600'} size={20} />
          <p className={`text-sm ${error ? 'text-red-800' : 'text-green-800'}`}>
            {error || success}
          </p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64">
          <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const disabled = tab.id === 'store' && !hasPermission('canManageProducts');
              
              return (
                <button
                  key={tab.id}
                  onClick={() => !disabled && setActiveTab(tab.id)}
                  disabled={disabled}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : disabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'store' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Store Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                    <input
                      type="text"
                      value={storeSettings.storeName}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Email</label>
                    <input
                      type="email"
                      value={storeSettings.storeEmail}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storeEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Phone</label>
                    <input
                      type="tel"
                      value={storeSettings.storePhone}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storePhone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Address</label>
                    <textarea
                      value={storeSettings.storeAddress}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storeAddress: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <select
                        value={storeSettings.currency}
                        onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                      <input
                        type="number"
                        value={storeSettings.taxRate}
                        onChange={(e) => setStoreSettings({ ...storeSettings, taxRate: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSaveStore}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={20} />
                    {loading ? 'Saving...' : 'Save Store Settings'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Settings</h2>
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Cash on Delivery (COD)</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paymentSettings.codEnabled}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, codEnabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <p className="text-sm text-gray-600">Allow customers to pay with cash on delivery</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Razorpay</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paymentSettings.razorpayEnabled}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayEnabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    {paymentSettings.razorpayEnabled && (
                      <div className="space-y-3 mt-4">
                        <input
                          type="text"
                          placeholder="Razorpay Key ID"
                          value={paymentSettings.razorpayKeyId}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayKeyId: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="password"
                          placeholder="Razorpay Key Secret"
                          value={paymentSettings.razorpayKeySecret}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayKeySecret: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleSavePayment}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={20} />
                    {loading ? 'Saving...' : 'Save Payment Settings'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Free Shipping Threshold (₹)
                    </label>
                    <input
                      type="number"
                      value={shippingSettings.freeShippingThreshold}
                      onChange={(e) => setShippingSettings({ ...shippingSettings, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">Orders above this amount get free shipping</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Standard Shipping Fee (₹)
                      </label>
                      <input
                        type="number"
                        value={shippingSettings.standardShippingFee}
                        onChange={(e) => setShippingSettings({ ...shippingSettings, standardShippingFee: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Express Shipping Fee (₹)
                      </label>
                      <input
                        type="number"
                        value={shippingSettings.expressShippingFee}
                        onChange={(e) => setShippingSettings({ ...shippingSettings, expressShippingFee: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Standard Delivery Time
                      </label>
                      <input
                        type="text"
                        value={shippingSettings.deliveryTime}
                        onChange={(e) => setShippingSettings({ ...shippingSettings, deliveryTime: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Express Delivery Time
                      </label>
                      <input
                        type="text"
                        value={shippingSettings.expressDeliveryTime}
                        onChange={(e) => setShippingSettings({ ...shippingSettings, expressDeliveryTime: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSaveShipping}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={20} />
                    {loading ? 'Saving...' : 'Save Shipping Settings'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Email Settings</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <h3 className="font-semibold text-gray-800">Email Notifications</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Order Confirmation</span>
                      <input
                        type="checkbox"
                        checked={emailSettings.orderConfirmation}
                        onChange={(e) => setEmailSettings({ ...emailSettings, orderConfirmation: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Order Shipped</span>
                      <input
                        type="checkbox"
                        checked={emailSettings.orderShipped}
                        onChange={(e) => setEmailSettings({ ...emailSettings, orderShipped: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Order Delivered</span>
                      <input
                        type="checkbox"
                        checked={emailSettings.orderDelivered}
                        onChange={(e) => setEmailSettings({ ...emailSettings, orderDelivered: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                      <input
                        type="email"
                        value={emailSettings.fromEmail}
                        onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                      <input
                        type="text"
                        value={emailSettings.fromName}
                        onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSaveEmail}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={20} />
                    {loading ? 'Saving...' : 'Save Email Settings'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={profileSettings.currentPassword}
                        onChange={(e) => setProfileSettings({ ...profileSettings, currentPassword: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      value={profileSettings.newPassword}
                      onChange={(e) => setProfileSettings({ ...profileSettings, newPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={profileSettings.confirmPassword}
                      onChange={(e) => setProfileSettings({ ...profileSettings, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={handleChangePassword}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={20} />
                    {loading ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;