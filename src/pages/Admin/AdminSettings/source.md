// ============================================
// FILE: src/pages/admin/Settings/hooks/useSettings.js
// ============================================
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useSettings = () => {
  const [activeTab, setActiveTab] = useState('store');
  const [showPassword, setShowPassword] = useState(false);
  
  // Load settings from localStorage on mount
  const loadSettings = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [storeSettings, setStoreSettings] = useState(() => 
    loadSettings('storeSettings', {
      storeName: 'My E-Commerce Store',
      storeEmail: 'store@example.com',
      storePhone: '+91 1234567890',
      storeAddress: '123 Main St, City, Country',
      currency: 'INR',
      timezone: 'Asia/Kolkata',
      taxRate: 18,
      logo: ''
    })
  );

  const [paymentSettings, setPaymentSettings] = useState(() =>
    loadSettings('paymentSettings', {
      codEnabled: true,
      stripeEnabled: false,
      stripePublicKey: '',
      stripeSecretKey: '',
      razorpayEnabled: false,
      razorpayKeyId: '',
      razorpayKeySecret: ''
    })
  );

  const [shippingSettings, setShippingSettings] = useState(() =>
    loadSettings('shippingSettings', {
      freeShippingThreshold: 500,
      standardShippingFee: 50,
      expressShippingFee: 100,
      deliveryTime: '3-5 business days',
      expressDeliveryTime: '1-2 business days'
    })
  );

  const [emailSettings, setEmailSettings] = useState(() =>
    loadSettings('emailSettings', {
      orderConfirmation: true,
      orderShipped: true,
      orderDelivered: true,
      smtpHost: '',
      smtpPort: 587,
      smtpUser: '',
      smtpPassword: '',
      fromEmail: 'noreply@store.com',
      fromName: 'My Store'
    })
  );

  const [profileSettings, setProfileSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const saveSettings = (key, value, message) => {
    localStorage.setItem(key, JSON.stringify(value));
    toast.success(message);
  };

  const handleSaveStore = () => {
    saveSettings('storeSettings', storeSettings, 'Store settings saved successfully!');
  };

  const handleSavePayment = () => {
    saveSettings('paymentSettings', paymentSettings, 'Payment settings saved successfully!');
  };

  const handleSaveShipping = () => {
    saveSettings('shippingSettings', shippingSettings, 'Shipping settings saved successfully!');
  };

  const handleSaveEmail = () => {
    saveSettings('emailSettings', emailSettings, 'Email settings saved successfully!');
  };

  const handleChangePassword = () => {
    if (profileSettings.newPassword !== profileSettings.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (profileSettings.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long!');
      return;
    }
    toast.success('Password changed successfully!');
    setProfileSettings({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return {
    activeTab,
    setActiveTab,
    showPassword,
    setShowPassword,
    storeSettings,
    setStoreSettings,
    paymentSettings,
    setPaymentSettings,
    shippingSettings,
    setShippingSettings,
    emailSettings,
    setEmailSettings,
    profileSettings,
    setProfileSettings,
    handleSaveStore,
    handleSavePayment,
    handleSaveShipping,
    handleSaveEmail,
    handleChangePassword,
  };
};

// ============================================
// FILE: src/pages/admin/Settings/components/SettingsTabs.jsx
// ============================================
import React from 'react';
import { Store, CreditCard, Truck, Mail, User } from 'lucide-react';

export const SettingsTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'store', name: 'Store Settings', icon: Store },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'shipping', name: 'Shipping', icon: Truck },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'profile', name: 'Profile', icon: User }
  ];

  return (
    <div className="lg:w-64">
      <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
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
  );
};

// ============================================
// FILE: src/pages/admin/Settings/components/StoreSettingsTab.jsx
// ============================================
import React from 'react';
import { Save } from 'lucide-react';

export const StoreSettingsTab = ({ settings, setSettings, onSave }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Store Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
          <input
            type="text"
            value={settings.storeName}
            onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Store Email</label>
          <input
            type="email"
            value={settings.storeEmail}
            onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Store Phone</label>
          <input
            type="tel"
            value={settings.storePhone}
            onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Store Address</label>
          <textarea
            value={settings.storeAddress}
            onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
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
              value={settings.taxRate}
              onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <button
          onClick={onSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Save size={20} />
          Save Store Settings
        </button>
      </div>
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Settings/components/PaymentSettingsTab.jsx
// ============================================
import React from 'react';
import { Save } from 'lucide-react';

export const PaymentSettingsTab = ({ settings, setSettings, onSave }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Settings</h2>
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Razorpay</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.razorpayEnabled}
                onChange={(e) => setSettings({ ...settings, razorpayEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          {settings.razorpayEnabled && (
            <div className="space-y-3 mt-4">
              <input
                type="text"
                placeholder="Razorpay Key ID"
                value={settings.razorpayKeyId}
                onChange={(e) => setSettings({ ...settings, razorpayKeyId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="password"
                placeholder="Razorpay Key Secret"
                value={settings.razorpayKeySecret}
                onChange={(e) => setSettings({ ...settings, razorpayKeySecret: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        <button
          onClick={onSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Save size={20} />
          Save Payment Settings
        </button>
      </div>
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Settings/components/ShippingSettingsTab.jsx
// ============================================
import React from 'react';
import { Save } from 'lucide-react';

export const ShippingSettingsTab = ({ settings, setSettings, onSave }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Free Shipping Threshold (₹)
          </label>
          <input
            type="number"
            value={settings.freeShippingThreshold}
            onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
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
              value={settings.standardShippingFee}
              onChange={(e) => setSettings({ ...settings, standardShippingFee: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Express Shipping Fee (₹)
            </label>
            <input
              type="number"
              value={settings.expressShippingFee}
              onChange={(e) => setSettings({ ...settings, expressShippingFee: Number(e.target.value) })}
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
              value={settings.deliveryTime}
              onChange={(e) => setSettings({ ...settings, deliveryTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Express Delivery Time
            </label>
            <input
              type="text"
              value={settings.expressDeliveryTime}
              onChange={(e) => setSettings({ ...settings, expressDeliveryTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <button
          onClick={onSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Save size={20} />
          Save Shipping Settings
        </button>
      </div>
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Settings/components/EmailSettingsTab.jsx
// ============================================
import React from 'react';
import { Save } from 'lucide-react';

export const EmailSettingsTab = ({ settings, setSettings, onSave }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Email Settings</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <h3 className="font-semibold text-gray-800">Email Notifications</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Order Confirmation</span>
            <input
              type="checkbox"
              checked={settings.orderConfirmation}
              onChange={(e) => setSettings({ ...settings, orderConfirmation: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Order Shipped</span>
            <input
              type="checkbox"
              checked={settings.orderShipped}
              onChange={(e) => setSettings({ ...settings, orderShipped: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Order Delivered</span>
            <input
              type="checkbox"
              checked={settings.orderDelivered}
              onChange={(e) => setSettings({ ...settings, orderDelivered: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
            <input
              type="email"
              value={settings.fromEmail}
              onChange={(e) => setSettings({ ...settings, fromEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
            <input
              type="text"
              value={settings.fromName}
              onChange={(e) => setSettings({ ...settings, fromName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <button
          onClick={onSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Save size={20} />
          Save Email Settings
        </button>
      </div>
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Settings/components/ProfileSettingsTab.jsx
// ============================================
import React from 'react';
import { Save, Eye, EyeOff } from 'lucide-react';

export const ProfileSettingsTab = ({ settings, setSettings, showPassword, setShowPassword, onChangePassword }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={settings.currentPassword}
              onChange={(e) => setSettings({ ...settings, currentPassword: e.target.value })}
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
            value={settings.newPassword}
            onChange={(e) => setSettings({ ...settings, newPassword: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
          <input
            type="password"
            value={settings.confirmPassword}
            onChange={(e) => setSettings({ ...settings, confirmPassword: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={onChangePassword}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Save size={20} />
          Change Password
        </button>
      </div>
    </div>
  );
};

// ============================================
// FILE: src/pages/admin/Settings/index.jsx
// ============================================
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSettings } from './hooks/useSettings';
import { SettingsTabs } from './components/SettingsTabs';
import { StoreSettingsTab } from './components/StoreSettingsTab';
import { PaymentSettingsTab } from './components/PaymentSettingsTab';
import { ShippingSettingsTab } from './components/ShippingSettingsTab';
import { EmailSettingsTab } from './components/EmailSettingsTab';
import { ProfileSettingsTab } from './components/ProfileSettingsTab';

const Settings = () => {
  const {
    activeTab,
    setActiveTab,
    showPassword,
    setShowPassword,
    storeSettings,
    setStoreSettings,
    paymentSettings,
    setPaymentSettings,
    shippingSettings,
    setShippingSettings,
    emailSettings,
    setEmailSettings,
    profileSettings,
    setProfileSettings,
    handleSaveStore,
    handleSavePayment,
    handleSaveShipping,
    handleSaveEmail,
    handleChangePassword,
  } = useSettings();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'store' && (
              <StoreSettingsTab
                settings={storeSettings}
                setSettings={setStoreSettings}
                onSave={handleSaveStore}
              />
            )}

            {activeTab === 'payment' && (
              <PaymentSettingsTab
                settings={paymentSettings}
                setSettings={setPaymentSettings}
                onSave={handleSavePayment}
              />
            )}

            {activeTab === 'shipping' && (
              <ShippingSettingsTab
                settings={shippingSettings}
                setSettings={setShippingSettings}
                onSave={handleSaveShipping}
              />
            )}

            {activeTab === 'email' && (
              <EmailSettingsTab
                settings={emailSettings}
                setSettings={setEmailSettings}
                onSave={handleSaveEmail}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileSettingsTab
                settings={profileSettings}
                setSettings={setProfileSettings}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onChangePassword={handleChangePassword}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;