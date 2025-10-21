"use client"

import { useState } from "react"
import { Bell, Shield, Globe, Moon } from "lucide-react"

export default function SettingsSection() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  })

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: "English",
    currency: "USD",
  })

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      {/* Notifications */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-900">Notifications</h3>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-700 capitalize">{key} Notifications</span>
              <button
                onClick={() => setNotifications((prev) => ({ ...prev, [key]: !value }))}
                className={`w-12 h-6 rounded-full transition-colors ${
                  value ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    value ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-900">Privacy & Security</h3>
        </div>

        <div className="space-y-4">
          <button className="w-full text-left p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">Change Password</div>
            <div className="text-sm text-gray-500">Update your account password</div>
          </button>
          <button className="w-full text-left p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">Two-Factor Authentication</div>
            <div className="text-sm text-gray-500">Add an extra layer of security</div>
          </button>
          <button className="w-full text-left p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">Privacy Settings</div>
            <div className="text-sm text-gray-500">Control who can see your information</div>
          </button>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Preferences</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Dark Mode</span>
            </div>
            <button
              onClick={() => setPreferences((prev) => ({ ...prev, darkMode: !prev.darkMode }))}
              className={`w-12 h-6 rounded-full transition-colors ${
                preferences.darkMode ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preferences.darkMode ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">Language</span>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">Currency</span>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
