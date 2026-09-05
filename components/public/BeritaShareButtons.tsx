'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Check, MessageCircle, Link2 } from 'lucide-react';

interface BeritaShareButtonsProps {
  title: string;
  slug: string;
}

export function BeritaShareButtons({ title, slug }: BeritaShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, [slug]);

  const handleCopy = async () => {
    const urlToCopy = shareUrl || `${window.location.origin}/berita/${slug}`;
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API unavailable
      const textArea = document.createElement('textarea');
      textArea.value = urlToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    const urlToShare = shareUrl || `${window.location.origin}/berita/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `${title} - Padukuhan Jumeneng Kidul`,
          url: urlToShare,
        });
      } catch {
        // User dismissed share dialog
      }
    } else {
      handleCopy();
    }
  };

  const waText = encodeURIComponent(
    `${title}\n\nBaca warta selengkapnya di Portal Resmi Padukuhan Jumeneng Kidul:\n${shareUrl || `/berita/${slug}`}`
  );
  const waShareUrl = `https://api.whatsapp.com/send?text=${waText}`;

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {/* Tombol Salin Tautan */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Salin tautan artikel berita"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-stone-700 bg-white hover:bg-stone-50 active:bg-stone-100 border border-stone-200/90 shadow-2xs transition-colors min-h-[44px] cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-700" />
            <span className="text-emerald-700 font-bold">Tautan Tersalin!</span>
          </>
        ) : (
          <>
            <Link2 className="w-4 h-4 text-stone-500" />
            <span>Salin Tautan</span>
          </>
        )}
      </button>

      {/* Tombol Bagikan WhatsApp */}
      <a
        href={waShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan warta ini ke WhatsApp"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 border border-emerald-200/80 transition-colors min-h-[44px]"
      >
        <MessageCircle className="w-4 h-4 text-emerald-700" />
        <span>Bagikan ke WhatsApp</span>
      </a>

      {/* Tombol Native Share jika didukung browser HP */}
      <button
        type="button"
        onClick={handleNativeShare}
        aria-label="Bagikan warta ke aplikasi lain"
        className="sm:hidden inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-stone-700 bg-white border border-stone-200/90 shadow-2xs transition-colors min-h-[44px] cursor-pointer"
      >
        <Share2 className="w-4 h-4 text-stone-500" />
        <span>Lainnya</span>
      </button>
    </div>
  );
}
