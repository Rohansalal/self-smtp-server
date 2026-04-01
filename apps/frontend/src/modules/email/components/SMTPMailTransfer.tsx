import { useState } from 'react';
import { Send, Loader2, AlertCircle, CheckCircle, Mail, Clock } from 'lucide-react';
import { emailApi } from '@/lib/api';

interface SMTPMailTransferProps {
  campaignId?: number;
  contactId?: number;
  defaultTo?: string;
  defaultSubject?: string;
  defaultHtml?: string;
  defaultText?: string;
}

export function SMTPMailTransfer({
  campaignId,
  contactId,
  defaultTo = '',
  defaultSubject = '',
  defaultHtml = '',
  defaultText = '',
}: SMTPMailTransferProps) {
  const [to, setTo] = useState(defaultTo);
  const [subject, setSubject] = useState(defaultSubject);
  const [text, setText] = useState(defaultText);
  const [html, setHtml] = useState(defaultHtml);
  const [showHtml, setShowHtml] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const [from, setFrom] = useState('info@protechplanner.com');
  const [replyTo, setReplyTo] = useState('');
  const [Cc, setCc] = useState('');
  const [Bcc, setBcc] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    
    try {
      const emailData: any = {
        to,
        subject,
        from,
        campaignId,
        contactId,
        replyTo: replyTo || undefined,
      };

      if (showHtml && html) {
        emailData.html = html;
      } else if (text) {
        emailData.text = text;
      }

      await emailApi.send(emailData);
      
      setIsSuccess(true);
      setTo('');
      setSubject('');
      setText('');
      setHtml('');
      setCc('');
      setBcc('');
      setReplyTo('');
      
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to send email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">SMTP Mail Transfer</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {showAdvanced ? 'Hide' : 'Show'} Advanced
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="recipient@example.com"
            />
          </div>
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reply-To</label>
              <input
                type="email"
                value={replyTo}
                onChange={(e) => setReplyTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cc</label>
              <input
                type="email"
                value={Cc}
                onChange={(e) => setCc(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bcc</label>
              <input
                type="email"
                value={Bcc}
                onChange={(e) => setBcc(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter email subject"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowHtml(!showHtml)}
            className={`text-sm px-3 py-1 rounded-lg transition-colors ${
              showHtml ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {showHtml ? 'HTML' : 'Plain Text'}
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {showPreview ? 'Hide Preview' : 'Preview'}
          </button>
        </div>

        {showHtml ? (
          <div>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="<html><body><h1>Hello!</h1></body></html>"
            />
          </div>
        ) : (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your message..."
          />
        )}

        {showPreview && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
            <div className="text-sm text-gray-600">
              <p><strong>From:</strong> {from}</p>
              <p><strong>To:</strong> {to}</p>
              <p><strong>Subject:</strong> {subject}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {isSuccess && (
          <div className="flex items-center gap-2 p-4 bg-green-50 text-green-600 rounded-lg">
            <CheckCircle className="w-5 h-5" />
            <p className="text-sm">Email queued for delivery!</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Sent via Haraka SMTP</span>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {isLoading ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </form>
    </div>
  );
}
