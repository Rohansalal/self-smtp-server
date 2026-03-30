import { Mail, Send, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { label: 'Total Sent', value: '12,458', change: '+12.5%', positive: true, icon: Send },
  { label: 'Delivered', value: '11,892', change: '+8.2%', positive: true, icon: Mail },
  { label: 'Open Rate', value: '34.2%', change: '+2.1%', positive: true, icon: TrendingUp },
  { label: 'Contacts', value: '3,847', change: '-5.3%', positive: false, icon: Users },
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

export function Dashboard() {
  return (
    <div className="space-y-6">
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

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="sent" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="opened" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Campaigns</h3>
          <div className="space-y-4">
            {[
              { name: 'Q4 Sales Outreach', status: 'Completed', sent: 500, rate: '32%' },
              { name: 'Newsletter - Nov', status: 'Sending', sent: 234, rate: '28%' },
              { name: 'Product Launch', status: 'Draft', sent: 0, rate: '-' },
            ].map((campaign) => (
              <div key={campaign.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{campaign.name}</p>
                  <p className="text-sm text-gray-500">{campaign.sent} sent</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  campaign.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  campaign.status === 'Sending' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {campaign.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing</h3>
          <div className="space-y-4">
            {[
              { subject: 'Exclusive Offer Inside', opens: 145, rate: '42%' },
              { subject: 'Your Custom Quote', opens: 132, rate: '38%' },
              { subject: 'Meeting Follow-up', opens: 98, rate: '35%' },
            ].map((email, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{email.subject}</p>
                  <p className="text-sm text-gray-500">{email.opens} opens</p>
                </div>
                <span className="text-green-600 font-medium">{email.rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}