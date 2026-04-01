import { useState } from 'react';
import { Plus, Loader2, Upload } from 'lucide-react';
import { useCreateContact, useCreateBulkContact, useImportCSV } from '../api';

interface ContactFormProps {
  onSuccess?: (contact: any) => void;
  onError?: (error: Error) => void;
}

export function ContactForm({ onSuccess, onError }: ContactFormProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [tags, setTags] = useState('');

  const createContact = useCreateContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const contact = await createContact.mutateAsync({
        email,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        company: company || undefined,
        tags: tags || undefined,
      });
      setEmail('');
      setFirstName('');
      setLastName('');
      setCompany('');
      setTags('');
      onSuccess?.(contact);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const isLoading = createContact.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company
        </label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Acme Inc"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="client, vip"
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
        {isLoading ? 'Adding...' : 'Add Contact'}
      </button>

      {createContact.isError && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          Failed to add contact: {createContact.error?.message}
        </div>
      )}
    </form>
  );
}

interface ImportCSVProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function ImportCSV({ onSuccess, onError }: ImportCSVProps) {
  const [csvData, setCsvData] = useState('');
  
  const importCSV = useImportCSV();

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await importCSV.mutateAsync({ csv: csvData });
      setCsvData('');
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const isLoading = importCSV.isPending;

  return (
    <form onSubmit={handleImport} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Paste CSV Data
        </label>
        <textarea
          value={csvData}
          onChange={(e) => setCsvData(e.target.value)}
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          placeholder="email,firstName,lastName,company,tags&#10;john@example.com,John,Doe,Acme,vip&#10;jane@example.com,Jane,Smith,TechCo,client"
        />
        <p className="text-xs text-gray-500 mt-1">
          Format: email,firstName,lastName,company,tags
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !csvData}
        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Upload className="w-5 h-5" />
        )}
        {isLoading ? 'Importing...' : 'Import Contacts'}
      </button>
    </form>
  );
}
