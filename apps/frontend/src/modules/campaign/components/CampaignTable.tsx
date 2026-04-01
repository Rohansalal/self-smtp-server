import { useNavigate } from 'react-router-dom';
import { MoreVertical, Play, Pause, Trash2, Clock, CheckCircle, Send, FileEdit } from 'lucide-react';
import { useCampaignList, useStartCampaign, useUpdateCampaignStatus, useDeleteCampaign } from '../api';

const statusConfig = {
  draft: { icon: FileEdit, color: 'text-gray-600', bg: 'bg-gray-50', label: 'Draft' },
  scheduled: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Scheduled' },
  sending: { icon: Send, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Sending' },
  completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Completed' },
  paused: { icon: Pause, color: 'text-orange-600', bg: 'bg-orange-50', label: 'Paused' },
};

export function CampaignTable() {
  const navigate = useNavigate();
  const { data: campaigns, isLoading, refetch } = useCampaignList();
  const startCampaign = useStartCampaign();
  const updateStatus = useUpdateCampaignStatus();
  const deleteCampaign = useDeleteCampaign();

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

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const campaignList = campaigns || [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
              Campaign
            </th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
              Subject
            </th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
              Status
            </th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
              Recipients
            </th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
              Sent
            </th>
            <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {campaignList.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                No campaigns yet. Create your first campaign to get started.
              </td>
            </tr>
          ) : (
            campaignList.map((campaign: any) => {
              const status = statusConfig[campaign.status as keyof typeof statusConfig] || statusConfig.draft;
              const StatusIcon = status.icon;
              
              return (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => navigate(`/campaigns/${campaign.id}`)}
                      className="text-sm font-medium text-gray-900 hover:text-blue-600"
                    >
                      {campaign.name}
                    </button>
                    <p className="text-xs text-gray-500">
                      Created {new Date(campaign.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 truncate max-w-xs">{campaign.subject}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{campaign.totalRecipients || 0}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{campaign.sentCount || 0}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {campaign.status === 'draft' && (
                        <button
                          onClick={() => handleStart(campaign.id)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                          title="Start Campaign"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/campaigns/${campaign.id}`)}
                        className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                        title="Edit"
                      >
                        <FileEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(campaign.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
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
  );
}
