import { Mail, Search, Filter, MoreVertical, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useEmailList } from '../api';

const statusConfig = {
  queued: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  sent: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  delivered: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  opened: { icon: Mail, color: 'text-blue-600', bg: 'bg-blue-50' },
  clicked: { icon: Mail, color: 'text-purple-600', bg: 'bg-purple-50' },
  failed: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
};

interface EmailTableProps {
  campaignId?: number;
  limit?: number;
  offset?: number;
}

export function EmailTable({ campaignId, limit = 20, offset = 0 }: EmailTableProps) {
  const { data: emails, isLoading, error } = useEmailList({ campaignId, limit, offset });

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

  if (error) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <p>Failed to load emails: {error.message}</p>
        </div>
      </div>
    );
  }

  const emailList = emails || [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search emails..."
            className="border-0 bg-transparent focus:outline-none text-sm w-64"
          />
        </div>
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
              Recipient
            </th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
              Subject
            </th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
              Status
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
          {emailList.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                No emails found
              </td>
            </tr>
          ) : (
            emailList.map((email: any) => {
              const status = statusConfig[email.status as keyof typeof statusConfig] || statusConfig.queued;
              const StatusIcon = status.icon;
              
              return (
                <tr key={email.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{email.toEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 truncate max-w-xs">{email.subject}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {email.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-500">
                      {email.sentAt ? new Date(email.sentAt).toLocaleString() : '-'}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
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
