import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { useCreateCampaign } from '../api';

interface CreateCampaignFormProps {
  onSuccess?: (campaign: any) => void;
  onError?: (error: Error) => void;
}

export function CreateCampaignForm({ onSuccess, onError }: CreateCampaignFormProps) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [htmlTemplate, setHtmlTemplate] = useState('');
  const [textTemplate, setTextTemplate] = useState('');
  const [fromName, setFromName] = useState('');

  const createCampaign = useCreateCampaign();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const campaign = await createCampaign.mutateAsync({
        name,
        subject,
        htmlTemplate: htmlTemplate || undefined,
        textTemplate: textTemplate || undefined,
        fromName: fromName || undefined,
      });
      setName('');
      setSubject('');
      setHtmlTemplate('');
      setTextTemplate('');
      setFromName('');
      onSuccess?.(campaign);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const isLoading = createCampaign.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Campaign Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Q4 Sales Outreach"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Subject *
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Your custom quote is ready"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          From Name
        </label>
        <input
          type="text"
          value={fromName}
          onChange={(e) => setFromName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Protechplanner"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          HTML Template (optional)
        </label>
        <textarea
          value={htmlTemplate}
          onChange={(e) => setHtmlTemplate(e.target.value)}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          placeholder="<html>...</html>"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Plain Text Template (optional)
        </label>
        <textarea
          value={textTemplate}
          onChange={(e) => setTextTemplate(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Plain text version..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Plus className="w-5 h-5" />
        )}
        {isLoading ? 'Creating...' : 'Create Campaign'}
      </button>

      {createCampaign.isError && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          Failed to create campaign: {createCampaign.error?.message}
        </div>
      )}
    </form>
  );
}
