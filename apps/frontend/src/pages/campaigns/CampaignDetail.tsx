import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, BarChart3, Mail, Users } from 'lucide-react';

export function CampaignDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/campaigns" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaign #{id}</h1>
          <p className="text-gray-500">Created on Jan 15, 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-gray-500">Sent</span>
          </div>
          <p className="text-2xl font-bold">500</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-gray-500">Delivered</span>
          </div>
          <p className="text-2xl font-bold">478</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-gray-500">Open Rate</span>
          </div>
          <p className="text-2xl font-bold">32%</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-gray-500">Click Rate</span>
          </div>
          <p className="text-2xl font-bold">8%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Email Content</h3>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <p className="text-gray-700">Subject: Exclusive Offer Inside</p>
          <div className="mt-4 p-4 bg-white border border-gray-100 rounded">
            <p className="text-gray-500 italic">Email preview will appear here...</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Recipients</h3>
        <p className="text-gray-500">500 contacts selected</p>
      </div>
    </div>
  );
}