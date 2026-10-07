'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import type { User } from '@supabase/supabase-js';

export default function SettingsClient() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password change
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Delete account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Data export
  const [exportLoading, setExportLoading] = useState(false);
  const [dataMessage, setDataMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/auth/login');
        return;
      }
      setUser(user);
      setName(user.user_metadata?.full_name || '');
    });
  }, [router, supabase.auth]);

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setMessage({ type: 'error', text: 'Please enter your full name (at least 2 characters).' });
      return;
    }
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      data: { full_name: trimmedName },
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully.' });
    }
    setLoading(false);
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage(null);

    if (newPassword.length < 8) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 8 characters.' });
      setPasswordLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Passwords do not match.' });
      setPasswordLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setPasswordMessage({ type: 'error', text: error.message });
    } else {
      setPasswordMessage({ type: 'success', text: 'Password updated successfully.' });
      setNewPassword('');
      setConfirmPassword('');
    }
    setPasswordLoading(false);
  }

  async function handleExportData() {
    setExportLoading(true);
    setDataMessage(null);
    try {
      const res = await fetch('/api/account/export');
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Export failed');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tailorpic-data-export-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setDataMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to export data. Please try again.' });
    }
    setExportLoading(false);
  }

  async function handleDeleteAccount() {
    setDeleteLoading(true);
    setDataMessage(null);
    try {
      const res = await fetch('/api/account/delete', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete account');
      }
      // Sign out locally and redirect
      await supabase.auth.signOut();
      router.push('/?deleted=1');
    } catch (err) {
      setDataMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete account. Please contact support.' });
      setDeleteLoading(false);
    }
  }

  const isOAuthUser = user?.app_metadata?.provider === 'google';

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-display font-normal text-tp-ink">Settings</h1>
        <p className="mt-1 text-sm text-tp-muted">Manage your account and preferences.</p>
      </div>

      {/* Profile Section */}
      <div className="rounded-tp-dialog border border-tp-line bg-white shadow-sm">
        <div className="border-b border-tp-line/50 px-6 py-4">
          <h2 className="font-display text-xl font-normal text-tp-ink">Profile</h2>
        </div>
        <form onSubmit={handleUpdateProfile} className="space-y-4 p-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-tp-ink mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user?.email || ''}
              disabled
              className="block w-full rounded-tp-button border border-tp-line bg-tp-paper px-3.5 py-2.5 text-sm text-tp-muted"
            />
            <p className="mt-1 text-xs text-tp-muted">Email cannot be changed.</p>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-tp-ink mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              maxLength={80}
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-tp-button border border-tp-line px-3.5 py-2.5 text-sm text-tp-ink placeholder-tp-muted shadow-sm focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/20 transition-colors"
              placeholder="Your full name"
            />
          </div>

          {message && (
            <div role={message?.type === 'error' ? 'alert' : 'status'} className={`rounded-tp-button border p-3 text-sm ${
              message.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <Button type="submit" size="sm" loading={loading}>
            Save changes
          </Button>
        </form>
      </div>

      {/* Password Section (only for email users) */}
      {!isOAuthUser && (
        <div className="rounded-tp-dialog border border-tp-line bg-white shadow-sm">
          <div className="border-b border-tp-line/50 px-6 py-4">
            <h2 className="font-display text-xl font-normal text-tp-ink">Change Password</h2>
          </div>
          <form onSubmit={handleChangePassword} className="space-y-4 p-6">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-tp-ink mb-1">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full rounded-tp-button border border-tp-line px-3.5 py-2.5 text-sm text-tp-ink placeholder-tp-muted shadow-sm focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/20 transition-colors"
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-tp-ink mb-1">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-tp-button border border-tp-line px-3.5 py-2.5 text-sm text-tp-ink placeholder-tp-muted shadow-sm focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/20 transition-colors"
                placeholder="Repeat your new password"
              />
            </div>

            {passwordMessage && (
              <div className={`rounded-tp-button border p-3 text-sm ${
                passwordMessage.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                {passwordMessage.text}
              </div>
            )}

            <Button type="submit" size="sm" loading={passwordLoading}>
              Update password
            </Button>
          </form>
        </div>
      )}

      {/* Data & Privacy Section */}
      <div className="rounded-tp-dialog border border-tp-line bg-white shadow-sm">
        <div className="border-b border-tp-line/50 px-6 py-4">
          <h2 className="font-display text-xl font-normal text-tp-ink">Data &amp; Privacy</h2>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-tp-muted">
            Download a copy of all personal data we hold about you, including orders, generated images metadata, and account information.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            loading={exportLoading}
            onClick={handleExportData}
          >
            Download my data
          </Button>
          {dataMessage && (
            <div role="alert" className="rounded-tp-button border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {dataMessage.text}
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-tp-dialog border border-red-200 bg-white shadow-sm">
        <div className="border-b border-red-100 px-6 py-4">
          <h2 className="font-display text-xl font-normal text-red-700">Danger Zone</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-tp-muted mb-4">
            Permanently delete your account and all associated data, including orders, generated photos, and uploaded images. This action cannot be undone.
          </p>
          {dataMessage && showDeleteConfirm && (
            <div role="alert" className="mb-3 rounded-tp-button border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {dataMessage.text}
            </div>
          )}
          {showDeleteConfirm ? (
            <div className="rounded-tp-button bg-red-50 border border-red-200 p-4 space-y-3">
              <p className="text-sm font-medium text-red-800">
                This will permanently delete your account and all data. Type <strong>DELETE</strong> to confirm.
              </p>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="block w-full rounded-tp-button border border-red-300 px-3.5 py-2.5 text-sm text-tp-ink placeholder-tp-muted focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmText !== 'DELETE' || deleteLoading}
                  className="rounded-tp-button bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleteLoading ? 'Deleting…' : 'Yes, delete my account'}
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteConfirmText('');
                  }}
                  className="rounded-tp-button border border-tp-line bg-white px-4 py-2 text-sm font-medium text-tp-ink hover:bg-tp-paper transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="rounded-tp-button border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 transition-colors"
            >
              Delete account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
