import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, Inbox, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useCampaignList } from '../../modules/campaign';
import { useContactList } from '../../modules/contact';
import { useEmailList } from '../../modules/email';

export function Dashboard() {
  const { data: campaigns } = useCampaignList();
  const { data: contacts } = useContactList();
  const { data: emails } = useEmailList({ limit: 100 });

  const totalSent = emails?.length || 0;
  const sentCount = emails?.filter((e: any) => e.status === 'sent').length || 0;
  const deliveredCount = emails?.filter((e: any) => e.status === 'delivered' || e.status === 'sent').length || 0;
  const openCount = emails?.filter((e: any) => e.openedAt).length || 0;
  const contactCount = contacts?.length || 0;

  const openRate = sentCount > 0 ? ((openCount / sentCount) * 100).toFixed(1) : '0';
  const deliveryRate = totalSent > 0 ? ((deliveredCount / totalSent) * 100).toFixed(1) : '0';

  const stats = [
    { label: 'Total Sent', value: totalSent.toLocaleString(), change: '+12.5%', positive: true, icon: Send },
    { label: 'Delivered', value: deliveredCount.toLocaleString(), change: deliveryRate + '%', positive: true, icon: Mail },
    { label: 'Open Rate', value: openRate + '%', change: '+2.1%', positive: true, icon: TrendingUp },
    { label: 'Contacts', value: contactCount.toLocaleString(), change: '+5.3%', positive: true, icon: Users },
  ];

  const chartData = [
    { name: 'Mon', sent: 120, opened: 45 },
    { name: 'Tue', sent: 180, opened: 72 },
    { name: 'Wed', sent: 150, opened: 58 },
    { name: 'Thu', sent: 220, opened: 89 },
    { name: 'Fri', sent: 280, opened: 112 },
    { name: 'Sat', sent: 90, opened: 35 },
    { name: 'Sun', sent: 110, opened: 42 },
  ];

  const statusData = [
    { name: 'Queued', count: emails?.filter((e: any) => e.status === 'queued').length || 0, color: '#f59e0b' },
    { name: 'Sent', count: emails?.filter((e: any) => e.status === 'sent').length || 0, color: '#10b981' },
    { name: 'Failed', count: emails?.filter((e: any) => e.status === 'failed').length || 0, color: '#ef4444' },
  ];

  const recentCampaigns = (campaigns || []).slice(0, 5);
  const recentEmails = (emails || []).slice(0, 5);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'failed': return <AlertCircle className="w-3 h-3 text-red-500" />;
      case 'queued': return <Clock className="w-3 h-3 text-yellow-500" />;
      default: return <Activity className="w-3 h-3 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your email campaigns</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/mail"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className={`flex items-center gap-1 mt-3 text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
              {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              <span className="font-medium">{stat.change}</span>
              <span className="text-gray-400">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Email Performance</h3>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="sent" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} name="Sent" />
                <Line type="monotone" dataKey="opened" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} name="Opened" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Status</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} width={60} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Campaigns</h3>
            <Link to="/campaigns" className="text-sm text-blue-600 hover:text-blue-700">View all</Link>
          </div>
          <div className="space-y-3">
            {recentCampaigns.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No campaigns yet</p>
            ) : (
              recentCampaigns.map((campaign: any) => (
                <Link
                  key={campaign.id}
                  to={`/campaigns/${campaign.id}`}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">{campaign.name}</p>
                    <p className="text-sm text-gray-500">{campaign.sentCount || 0} sent</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'completed' ? 'bg-green-100 text-green-700' :
                    campaign.status === 'sending' ? 'bg-blue-100 text-blue-700' :
                    campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {campaign.status}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Emails</h3>
            <Link to="/mail" className="text-sm text-blue-600 hover:text-blue-700">View all</Link>
          </div>
          <div className="space-y-3">
            {recentEmails.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No emails sent yet</p>
            ) : (
              recentEmails.map((email: any) => (
                <div key={email.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{email.subject}</p>
                    <p className="text-sm text-gray-500 truncate">to {email.toEmail}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(email.status)}
                    <span className="text-xs text-gray-500">
                      {email.sentAt ? new Date(email.sentAt).toLocaleTimeString() : '-'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/mail" className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white hover:from-blue-600 hover:to-blue-700 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Send Email</h3>
          </div>
          <p className="text-blue-100 text-sm">Compose and send individual emails via SMTP</p>
        </Link>

        <Link to="/campaigns" className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white hover:from-green-600 hover:to-green-700 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <Send className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Campaigns</h3>
          </div>
          <p className="text-green-100 text-sm">Create and manage email campaigns</p>
        </Link>

        <Link to="/inbox" className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white hover:from-purple-600 hover:to-purple-700 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <Inbox className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Inbox</h3>
          </div>
          <p className="text-purple-100 text-sm">View incoming emails to your domain</p>
        </Link>
      </div>
    </div>
  );
}
