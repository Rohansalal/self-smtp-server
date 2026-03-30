import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, MoreVertical, Play, Pause, Trash2 } from 'lucide-react';
import { trpc } from '../../lib/trpc';

export function Campaigns() {
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', subject: '', htmlTemplate: '' });

  const createMutation = trpc.campaign.create.useMutation({
    onSuccess: () => {
      setShowCreate(false);
      setForm({ name: '', subject: '', htmlTemplate: '' });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMutation.mutateAsync({
      name: form.name,
      subject: form.subject,
      htmlTemplate: form.htmlTemplate,
      userId: 1,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-80"
          />
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      {showCreate && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Campaign</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g., Q4 Sales Campaign"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g., Exclusive Offer Inside"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">HTML Template</label>
              <textarea
                value={form.htmlTemplate}
                onChange={(e) => setForm({ ...form, htmlTemplate: e.target.value })}
                rows={8}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm"
                placeholder="<h1>Hello {{name}}</h1>..."
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createMutation.isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {createMutation.isLoading ? 'Creating...' : 'Create Campaign'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipients</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { id: 1, name: 'Q4 Sales Outreach', subject: 'Exclusive Offer for Q4', status: 'completed', sent: 500, openRate: '32%' },
              { id: 2, name: 'Newsletter - November', subject: 'Your Monthly Update', status: 'sending', sent: 234, openRate: '28%' },
              { id: 3, name: 'Product Launch', subject: 'Introducing Our New Feature', status: 'draft', sent: 0, openRate: '-' },
              { id: 4, name: 'Winter Promotion', subject: 'Winter Sale Inside', status: 'paused', sent: 150, openRate: '25%' },
            ].map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <Link to={`/campaigns/${campaign.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                    {campaign.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-500">{campaign.subject}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'completed' ? 'bg-green-100 text-green-700' :
                    campaign.status === 'sending' ? 'bg-blue-100 text-blue-700' :
                    campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{campaign.sent}</td>
                <td className="px-6 py-4 text-gray-500">{campaign.openRate}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {campaign.status === 'draft' && (
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    {campaign.status === 'sending' && (
                      <button className="p-1 text-yellow-600 hover:bg-yellow-50 rounded">
                        <Pause className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}