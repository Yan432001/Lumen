import React, { useState } from 'react';
import { CloseOutlined, WarningOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { App } from 'antd';

export function ReportPostModal({ pin, onClose }) {
  const { message } = App.useApp();
  const [selectedReason, setSelectedReason] = useState('inappropriate');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!pin) return null;

  const reasons = [
    { key: 'inappropriate', label: 'Inappropriate or Sensitive Content', desc: 'Contains adult, violent, or hateful imagery or text.' },
    { key: 'copyright', label: 'Copyright or IP Infringement', desc: 'Used without original creator attribution or permissions.' },
    { key: 'spam', label: 'Spam, Deceptive, or Advertising', desc: 'Repetitive link farming, malicious links, or scam material.' },
    { key: 'harassment', label: 'Harassment or Impersonation', desc: 'Targets individuals or mimics official accounts.' },
    { key: 'other', label: 'Other Issue', desc: 'Any other violation of community conduct.' },
  ];

  const handleSubmitReport = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    message.success('Report submitted. Our moderation team has received this flag.');
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card report-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title text-rose-500">
            <WarningOutlined />
            <span>Report Post</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <CloseOutlined />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmitReport} className="report-form">
            <p className="text-xs text-slate-400 mb-3">
              Help us maintain an inspiring, safe, and illuminated community by identifying policy violations on <strong className="text-slate-200">"{pin.title}"</strong>.
            </p>

            <div className="report-reasons-list">
              {reasons.map((r) => (
                <label
                  key={r.key}
                  className={`report-reason-option ${selectedReason === r.key ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="reportReason"
                    value={r.key}
                    checked={selectedReason === r.key}
                    onChange={() => setSelectedReason(r.key)}
                    className="mr-3 accent-rose-500"
                  />
                  <div>
                    <div className="font-semibold text-sm">{r.label}</div>
                    <div className="text-xs text-slate-400">{r.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="form-group mt-3">
              <label className="form-label">Additional Details (Optional)</label>
              <textarea
                rows={2}
                className="form-textarea"
                placeholder="Provide any context that will help our review team..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>

            <div className="modal-footer-actions mt-4">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-danger">
                Submit Report
              </button>
            </div>
          </form>
        ) : (
          <div className="report-success-state py-8 text-center">
            <SafetyCertificateOutlined style={{ fontSize: '48px', color: '#10b981', marginBottom: '16px' }} />
            <h3 className="text-lg font-bold mb-2">Thank You for Reporting</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Our safety and review team has queued this post for evaluation. We appreciate you protecting the community.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
