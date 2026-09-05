'use client';

import React, { useMemo } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Plugins
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/plugins/counter.css';

import { Galeri } from '@/lib/types';
import { formatTanggalIndonesia } from '@/lib/date-utils';

interface GaleriLightboxProps {
  photos: Galeri[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function GaleriLightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: GaleriLightboxProps) {
  // Map photo items ke format slide yang didukung yet-another-react-lightbox
  const slides = useMemo(() => {
    return photos.map((item) => ({
      src: item.foto_url,
      alt: item.judul_kegiatan,
      title: item.judul_kegiatan,
      description: item.tanggal_kegiatan
        ? `Dokumentasi: ${formatTanggalIndonesia(item.tanggal_kegiatan)}`
        : undefined,
    }));
  }, [photos]);

  if (!isOpen || photos.length === 0) return null;

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={currentIndex}
      slides={slides}
      plugins={[Captions, Zoom, Counter]}
      on={{
        view: ({ index }) => {
          if (typeof onNavigate === 'function') {
            onNavigate(index);
          }
        },
      }}
      counter={{
        container: {
          style: {
            top: 14,
            left: 16,
            fontSize: '12px',
            fontWeight: 600,
            color: '#86efac',
            backgroundColor: 'rgba(20, 83, 45, 0.85)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '8px',
            padding: '4px 10px',
          },
        },
      }}
      captions={{
        showToggle: false,
        descriptionTextAlign: 'center',
      }}
      styles={{
        container: {
          backgroundColor: 'rgba(12, 10, 9, 0.96)',
          backdropFilter: 'blur(8px)',
        },
        captionsTitle: {
          textAlign: 'center',
        },
      }}
      carousel={{
        padding: '16px',
        spacing: '10%',
      }}
      animation={{
        fade: 200,
        swipe: 250,
      }}
      zoom={{
        maxZoomPixelRatio: 3,
        zoomInMultiplier: 1.5,
        doubleTapDelay: 300,
      }}
    />
  );
}
