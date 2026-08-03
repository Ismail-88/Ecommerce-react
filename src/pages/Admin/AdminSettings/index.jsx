import React, { useState, useEffect } from 'react';
import { Store, CreditCard, Truck, Mail, User, Save, Eye, EyeOff, AlertCircle, Settings as SettingsIcon } from 'lucide-react';
import { API_BASE_URL } from '../../../context/DataContext';
import Button from '../../../components/ui/Button';

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

    const response = await fetch(`${API_BASE_URL}/api${endpoint}`, options);
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

  const inputClass = "w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:outline-none transition-all";
  const labelClass = "block text-sm font-medium text-foreground mb-2";

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-soft text-brand-600 dark:text-brand-400">
          <SettingsIcon size={24} aria-hidden />
        </span>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground mb-1">Settings</h1>
          {adminProfile && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-semibold">
                {adminProfile.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{adminProfile.name}</p>
                <p className="text-xs text-text-muted capitalize">{adminProfile.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alert Messages */}
      {(error || success) && (
        <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${
          error ? 'bg-danger-soft border-danger/20' : 'bg-success-soft border-success/20'
        }`}>
          <AlertCircle className={error ? 'text-danger' : 'text-success'} size={20} aria-hidden />
          <p className={`text-sm ${error ? 'text-danger' : 'text-success'}`}>
            {error || success}
          </p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-surface rounded-2xl border border-border shadow-card p-4 space-y-2">
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
                      ? 'bg-brand-600 text-white'
                      : disabled
                      ? 'text-text-faint cursor-not-allowed'
                      : 'text-foreground hover:bg-surface-alt'
                  }`}
                >
                  <Icon size={20} aria-hidden />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-surface rounded-2xl border border-border shadow-card p-6">
            {activeTab === 'store' && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Store Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Store Name</label>
                    <input
                      type="text"
                      value={storeSettings.storeName}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Store Email</label>
                    <input
                      type="email"
                      value={storeSettings.storeEmail}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storeEmail: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Store Phone</label>
                    <input
                      type="tel"
                      value={storeSettings.storePhone}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storePhone: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Store Address</label>
                    <textarea
                      value={storeSettings.storeAddress}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storeAddress: e.target.value })}
                      className={inputClass}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Currency</label>
                      <select
                        value={storeSettings.currency}
                        onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                        className={inputClass}
                      >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Tax Rate (%)</label>
                      <input
                        type="number"
                        value={storeSettings.taxRate}
                        onChange={(e) => setStoreSettings({ ...storeSettings, taxRate: Number(e.target.value) })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveStore} loading={loading}>
                    <Save size={20} aria-hidden />
                    {loading ? 'Saving...' : 'Save Store Settings'}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Payment Settings</h2>
                <div className="space-y-6">
                  <div className="border border-border rounded-xl p-4 bg-background">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Cash on Delivery (COD)</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paymentSettings.codEnabled}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, codEnabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                      </label>
                    </div>
                    <p className="text-sm text-text-muted">Allow customers to pay with cash on delivery</p>
                  </div>

                  <div className="border border-border rounded-xl p-4 bg-background">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Razorpay</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paymentSettings.razorpayEnabled}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayEnabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                      </label>
                    </div>
                    {paymentSettings.razorpayEnabled && (
                      <div className="space-y-3 mt-4">
                        <input
                          type="text"
                          placeholder="Razorpay Key ID"
                          value={paymentSettings.razorpayKeyId}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayKeyId: e.target.value })}
                          className={inputClass}
                        />
                        <input
                          type="password"
                          placeholder="Razorpay Key Secret"
                          value={paymentSettings.razorpayKeySecret}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayKeySecret: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    )}
                  </div>

                  <Button onClick={handleSavePayment} loading={loading}>
                    <Save size={20} aria-hidden />
                    {loading ? 'Saving...' : 'Save Payment Settings'}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Shipping Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>
                      Free Shipping Threshold (₹)
                    </label>
                    <input
                      type="number"
                      value={shippingSettings.freeShippingThreshold}
                      onChange={(e) => setShippingSettings({ ...shippingSettings, freeShippingThreshold: Number(e.target.value) })}
                      className={inputClass}
                    />
                    <p className="text-sm text-text-muted mt-1">Orders above this amount get free shipping</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>
                        Standard Shipping Fee (₹)
                      </label>
                      <input
                        type="number"
                        value={shippingSettings.standardShippingFee}
                        onChange={(e) => setShippingSettings({ ...shippingSettings, standardShippingFee: Number(e.target.value) })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Express Shipping Fee (₹)
                      </label>
                      <input
                        type="number"
                        value={shippingSettings.expressShippingFee}
                        onChange={(e) => setShippingSettings({ ...shippingSettings, expressShippingFee: Number(e.target.value) })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>
                        Standard Delivery Time
                      </label>
                      <input
                        type="text"
                        value={shippingSettings.deliveryTime}
                        onChange={(e) => setShippingSettings({ ...shippingSettings, deliveryTime: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Express Delivery Time
                      </label>
                      <input
                        type="text"
                        value={shippingSettings.expressDeliveryTime}
                        onChange={(e) => setShippingSettings({ ...shippingSettings, expressDeliveryTime: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveShipping} loading={loading}>
                    <Save size={20} aria-hidden />
                    {loading ? 'Saving...' : 'Save Shipping Settings'}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Email Settings</h2>
                <div className="space-y-4">
                  <div className="bg-surface-alt p-4 rounded-xl space-y-3">
                    <h3 className="font-semibold text-foreground">Email Notifications</h3>
                    {[
                      { key: 'orderConfirmation', label: 'Order Confirmation' },
                      { key: 'orderShipped', label: 'Order Shipped' },
                      { key: 'orderDelivered', label: 'Order Delivered' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{item.label}</span>
                        <input
                          type="checkbox"
                          checked={emailSettings[item.key]}
                          onChange={(e) => setEmailSettings({ ...emailSettings, [item.key]: e.target.checked })}
                          className="w-4 h-4 text-brand-600 border-border rounded focus:ring-brand-500"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>From Email</label>
                      <input
                        type="email"
                        value={emailSettings.fromEmail}
                        onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>From Name</label>
                      <input
                        type="text"
                        value={emailSettings.fromName}
                        onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveEmail} loading={loading}>
                    <Save size={20} aria-hidden />
                    {loading ? 'Saving...' : 'Save Email Settings'}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={profileSettings.currentPassword}
                        onChange={(e) => setProfileSettings({ ...profileSettings, currentPassword: e.target.value })}
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-text-muted hover:text-foreground"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={20} aria-hidden /> : <Eye size={20} aria-hidden />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>New Password</label>
                    <input
                      type="password"
                      value={profileSettings.newPassword}
                      onChange={(e) => setProfileSettings({ ...profileSettings, newPassword: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Confirm New Password</label>
                    <input
                      type="password"
                      value={profileSettings.confirmPassword}
                      onChange={(e) => setProfileSettings({ ...profileSettings, confirmPassword: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <Button onClick={handleChangePassword} loading={loading}>
                    <Save size={20} aria-hidden />
                    {loading ? 'Changing...' : 'Change Password'}
                  </Button>
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
