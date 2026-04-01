import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useSendEmail } from '../api';

interface SendEmailFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function SendEmailForm({ onSuccess, onError }: SendEmailFormProps) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [html, setHtml] = useState('');
  const [showHtml, setShowHtml] = useState(false);

  const sendEmail = useSendEmail();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendEmail.mutateAsync({
        to,
        subject,
        text: showHtml ? undefined : text,
        html: showHtml ? html : undefined,
      });
      setTo('');
      setSubject('');
      setText('');
      setHtml('');
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const isLoading = sendEmail.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          To
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Email subject"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <button
            type="button"
            onClick={() => setShowHtml(!showHtml)}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            {showHtml ? 'Switch to plain text' : 'Switch to HTML'}
          </button>
        </div>
        {showHtml ? (
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            placeholder="<h1>Hello!</h1><p>Your HTML content here...</p>"
          />
        ) : (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your message..."
          />
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
        {isLoading ? 'Sending...' : 'Send Email'}
      </button>

      {sendEmail.isError && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          Failed to send email: {sendEmail.error?.message}
        </div>
      )}
    </form>
  );
}
