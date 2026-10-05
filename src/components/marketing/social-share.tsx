'use client';

import { useState } from 'react';
import { Linkedin, Facebook, Link2 } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  className?: string;
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function SocialShare({ url, title, className = '' }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XIcon className="w-4 h-4" />,
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <Facebook className="w-4 h-4" />,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={link.label}
          aria-label={link.label}
          className="inline-flex items-center justify-center w-9 h-9 rounded-tp-button border border-tp-line text-tp-muted transition-colors hover:text-tp-ink hover:border-tp-bronze"
        >
          {link.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy link'}
        aria-label={copied ? 'Link copied to clipboard' : 'Copy link'}
        className="inline-flex items-center justify-center h-9 rounded-tp-button border border-tp-line text-tp-muted transition-colors hover:text-tp-ink hover:border-tp-bronze px-3 gap-1.5"
      >
        <Link2 className="w-4 h-4" />
        {copied && (
          <span className="text-xs font-medium text-tp-bronze">Copied!</span>
        )}
      </button>
    </div>
  );
}
