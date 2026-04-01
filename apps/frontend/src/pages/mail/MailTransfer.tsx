import { SMTPMailTransfer, EmailTable } from '../../modules/email';

export function MailTransfer() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mail Transfer</h1>
        <p className="text-gray-500 mt-1">Send emails via SMTP (Haraka)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SMTPMailTransfer />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Tips</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                Use HTML for rich formatting, plain text for compatibility
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                Emails are queued and processed through Haraka SMTP
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                Configure SPF/DKIM/DMARC to avoid spam folder
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                Set Reply-To for threaded conversations
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">SMTP Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Provider</span>
                <span className="text-sm font-medium">Haraka</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Port</span>
                <span className="text-sm font-medium">587 (submission)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">DKIM Signed</span>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Emails</h2>
        <EmailTable limit={10} />
      </div>
    </div>
  );
}
