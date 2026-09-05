import React from 'react';
import { Sprout, Store, Landmark, Beef, Sparkles } from 'lucide-react';

export function renderPotensiVectorIcon(judul: string, iconKey?: string, sizeClass = 'w-7 h-7 sm:w-8 sm:h-8') {
  const text = `${judul} ${iconKey || ''}`.toLowerCase();

  if (text.includes('tani') || text.includes('padi') || text.includes('jagung') || text.includes('🌾') || text.includes('sprout')) {
    return <Sprout className={`${sizeClass} text-emerald-800`} />;
  }
  if (text.includes('umkm') || text.includes('usaha') || text.includes('melinjo') || text.includes('🏠') || text.includes('store')) {
    return <Store className={`${sizeClass} text-amber-800`} />;
  }
  if (text.includes('agama') || text.includes('ibadah') || text.includes('masjid') || text.includes('🕌') || text.includes('landmark')) {
    return <Landmark className={`${sizeClass} text-teal-800`} />;
  }
  if (text.includes('ternak') || text.includes('sapi') || text.includes('kambing') || text.includes('🐄') || text.includes('beef')) {
    return <Beef className={`${sizeClass} text-orange-800`} />;
  }

  return <Sparkles className={`${sizeClass} text-emerald-800`} />;
}
