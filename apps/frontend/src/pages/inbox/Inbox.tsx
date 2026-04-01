import { useState } from 'react';
import { Search, Star, Mail, Trash2, Archive, MoreVertical, Reply, Forward, CheckCircle, Clock } from 'lucide-react';

export function Inbox() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<any>(null);

  const mockEmails = [
    {
      id: '1',
      from: 'john@example.com',
      fromName: 'John Doe',
      to: 'info@protechplanner.com',
      subject: 'Re: Q4 Quote Request',
      body: 'Hi,\n\nI received your quote and wanted to follow up on the proposal. Could we schedule a call to discuss the details?\n\nBest regards,\nJohn',
      date: new Date().toISOString(),
      read: false,
      starred: false,
      status: 'received',
    },
    {
      id: '2',
      from: 'jane@company.com',
      fromName: 'Jane Smith',
      to: 'info@protechplanner.com',
      subject: 'Meeting Follow-up',
      body: 'Thanks for the meeting yesterday. As discussed, I\'ve attached the updated documents for your review.\n\nPlease let me know if you have any questions.\n\nBest,\nJane',
      date: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      starred: true,
      status: 'processed',
    },
    {
      id: '3',
      from: 'support@techvendor.com',
      fromName: 'Tech Vendor Support',
      to: 'info@protechplanner.com',
      subject: 'Ticket #12345 - Resolution',
      body: 'Hello,\n\nWe wanted to inform you that your support ticket has been resolved. Please review the solution and let us know if you need further assistance.\n\nTicket ID: #12345\nStatus: Resolved\n\nThank you for your patience.',
      date: new Date(Date.now() - 172800000).toISOString(),
      read: true,
      starred: false,
      status: 'processed',
    },
  ];

  const emails = mockEmails.filter(e => 
    e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'long' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
          <p className="text-gray-500 mt-1">Received emails from your custom domain</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Archive className="w-4 h-4" />
            Archive
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search emails..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Mail className="w-4 h-4" />
          {emails.filter(e => !e.read).length} unread
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex min-h-[600px]">
          <div className={`${selectedEmail ? 'w-1/3' : 'w-full'} border-r border-gray-100`}>
            <div className="divide-y divide-gray-100">
              {emails.length === 0 ? (
                <div className="p-12 text-center">
                  <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-lg font-medium text-gray-900">No emails</p>
                  <p className="text-sm text-gray-500">Your inbox is empty</p>
                </div>
              ) : (
                emails.map((email) => (
                  <button
                    key={email.id}
                    onClick={() => setSelectedEmail(email)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedEmail?.id === email.id ? 'bg-blue-50' : ''
                    } ${!email.read ? 'bg-gray-50' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <button className="mt-1 flex-shrink-0">
                        {email.starred ? (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ) : (
                          <Star className="w-4 h-4 text-gray-300" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`text-sm ${!email.read ? 'font-semibold' : 'font-medium'} text-gray-900 truncate`}>
                            {email.fromName || email.from}
                          </p>
                          <p className="text-xs text-gray-500 flex-shrink-0 ml-2">
                            {formatDate(email.date)}
                          </p>
                        </div>
                        <p className={`text-sm mb-1 truncate ${!email.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                          {email.subject}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{email.body.substring(0, 80)}...</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {selectedEmail && (
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedEmail(null)}
                    className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    ←
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Reply">
                    <Reply className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Forward">
                    <Forward className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Archive">
                    <Archive className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {(selectedEmail.fromName || selectedEmail.from)[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{selectedEmail.fromName || selectedEmail.from}</p>
                      <p className="text-sm text-gray-500">to {selectedEmail.to}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      selectedEmail.status === 'processed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {selectedEmail.status === 'processed' ? (
                        <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Processed</span>
                      ) : (
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>
                      )}
                    </span>
                    <span>{formatDate(selectedEmail.date)}</span>
                  </div>
                </div>

                <h1 className="text-xl font-semibold text-gray-900 mb-4">{selectedEmail.subject}</h1>

                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                  {selectedEmail.body}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-3">Reply or forward this message</p>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Reply className="w-4 h-4" />
                      Reply
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Forward className="w-4 h-4" />
                      Forward
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
