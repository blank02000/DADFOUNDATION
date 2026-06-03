/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SAMPLE_GALLERY } from '../sampleData';
import { LayoutGrid, ZoomIn, Eye, Activity } from 'lucide-react';

export function GalleryView() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-12 pb-20">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#006e1c] bg-emerald-50 px-3 py-1 rounded">Our Visual Footprint</span>
        <h1 className="text-3xl font-extrabold text-[#001836] tracking-tight">On-Ground Action Gallery</h1>
        <p className="text-sm font-medium text-gray-500 leading-relaxed">
          Take a look at our clinical installations, medical team conferences, purified drinking setups, and rural checkup camp loops.
        </p>
      </div>

      {/* Grid: Asymmetrical Grid cards layout */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SAMPLE_GALLERY.map((g, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedImage(g.image)}
            className="bg-white rounded-2xl border border-gray-150 p-3 group hover:shadow-md cursor-pointer transition-all hover:scale-101 flex flex-col justify-between"
          >
            <div className="h-52 overflow-hidden rounded-xl relative bg-gray-50 shrink-0">
              <img src={g.image} alt={g.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <div className="bg-white p-2.5 rounded-full text-[#001836]">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="pt-3 space-y-1 px-1">
              <span className="text-[10px] font-extrabold uppercase text-[#006e1c] tracking-widest block">
                {g.category}
              </span>
              <h4 className="text-xs font-bold text-[#001836] tracking-tight">{g.title}</h4>
            </div>
          </div>
        ))}
      </section>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-sm"
        >
          <img src={selectedImage} alt="Enlarged action asset" className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl border border-white/10" />
        </div>
      )}

    </div>
  );
}
