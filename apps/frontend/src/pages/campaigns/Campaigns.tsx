import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Play, Pause, Trash2, FileEdit, Clock, CheckCircle, Send } from 'lucide-react';
import { useCampaignList, useCreateCampaign, useStartCampaign, useDeleteCampaign } from '../../modules/campaign';

export function Campaigns() {
  const [showCreate, setShowCreate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState({ 
    name: '', 
    subject: '', 
    htmlTemplate: '', 
    textTemplate: '',
    fromName: '' 
  });

  const { data: campaigns, isLoading, refetch } = useCampaignList();
  const createCampaign = useCreateCampaign();
  const startCampaign = useStartCampaign();
  const deleteCampaign = useDeleteCampaign();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCampaign.mutateAsync({
      name: form.name,
      subject: form.subject,
      htmlTemplate: form.htmlTemplate || undefined,
      textTemplate: form.textTemplate || undefined,
      fromName: form.fromName || undefined,
    });
    setShowCreate(false);
    setForm({ name: '', subject: '', htmlTemplate: '', textTemplate: '', fromName: '' });
    refetch();
  };

  const handleStart = async (id: number) => {
    await startCampaign.mutateAsync({ id });
    refetch();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      await deleteCampaign.mutateAsync({ id });
      refetch();
    }
  };

  const statusConfig: Record<string, { icon: any; color: string; bg: string; label: string }> = {
    draft: { icon: FileEdit, color: 'text-gray-600', bg: 'bg-gray-50', label: 'Draft' },
    scheduled: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Scheduled' },
    sending: { icon: Send, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Sending' },
    completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Completed' },
    paused: { icon: Pause, color: 'text-orange-600', bg: 'bg-orange-50', label: 'Paused' },
  };

  const filteredCampaigns = (campaigns || []).filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-500 mt-1">Create and manage email campaigns</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {showCreate && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Campaign</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Name <span className="text-red-500">*</span>
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Line <span className="text-red-500">*</span>
                </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">From Name</label>
              <input
                type="text"
                value={form.fromName}
                onChange={(e) => setForm({ ...form, fromName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., Protechplanner Team"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">HTML Template</label>
              <textarea
                value={form.htmlTemplate}
                onChange={(e) => setForm({ ...form, htmlTemplate: e.target.value })}
                rows={8}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm"
                placeholder="<h1>Hello {{name}}</h1><p>Your content here...</p>"
              />
              <p className="text-xs text-gray-500 mt-1">Use {"{{name}}"} for personalization</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plain Text Version</label>
              <textarea
                value={form.textTemplate}
                onChange={(e) => setForm({ ...form, textTemplate: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Plain text version of your email..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createCampaign.isPending}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {createCampaign.isPending && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {createCampaign.isPending ? 'Creating...' : 'Create Campaign'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Rate</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td colSpan={7} className="px-6 py-4">
                    <div className="h-6 bg-gray-100 rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : filteredCampaigns.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <Send className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-lg font-medium text-gray-900">No campaigns yet</p>
                    <p className="text-sm">Create your first campaign to get started</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredCampaigns.map((campaign: any) => {
                const status = statusConfig[campaign.status] || statusConfig.draft;
                const StatusIcon = status.icon;
                const openRate = campaign.sentCount > 0 
                  ? ((campaign.openedCount || 0) / campaign.sentCount * 100).toFixed(1) + '%'
                  : '-';

                return (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link to={`/campaigns/${campaign.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                        {campaign.name}
                      </Link>
                      <p className="text-xs text-gray-500">
                        Created {new Date(campaign.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{campaign.subject}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{campaign.totalRecipients || 0}</td>
                    <td className="px-6 py-4 text-gray-500">{campaign.sentCount || 0}</td>
                    <td className="px-6 py-4 text-gray-500">{openRate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {campaign.status === 'draft' && (
                          <button
                            onClick={() => handleStart(campaign.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Start Campaign"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                        {campaign.status === 'sending' && (
                          <button
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Pause"
                          >
                            <Pause className="w-4 h-4" />
                          </button>
                        )}
                        <Link
                          to={`/campaigns/${campaign.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FileEdit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(campaign.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
