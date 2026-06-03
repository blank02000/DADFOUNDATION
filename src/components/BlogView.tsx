/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { BlogPost } from '../types';
import { SAMPLE_BLOGS } from '../sampleData';
import { Search, BookOpen, X, FileText } from 'lucide-react';

export function BlogView() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'blogs'),
      (snapshot) => {
        const bls: BlogPost[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          bls.push({
            id: docSnap.id,
            title: d.title,
            summary: d.summary,
            content: d.content,
            category: d.category,
            authorName: d.authorName,
            authorId: d.authorId,
            image: d.image,
            createdAt: d.createdAt
          });
        });
        setBlogs(bls.length > 0 ? bls : SAMPLE_BLOGS);
        setLoading(false);
      },
      (error) => {
        console.warn('Realtime blogs feed error, defaulting to static entries:', error);
        setBlogs(SAMPLE_BLOGS);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const categories = ['All', 'Healthcare', 'Caregiver Support', 'Community'];

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-12 pb-20 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 p-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B7330] bg-[#1B7330]/10 px-3 py-1 rounded-full">Knowledge Library</span>
        <h1 className="text-3xl font-extrabold text-[#0A2240] tracking-tight">Updates &amp; Support Resources</h1>
        <p className="text-xs md:text-sm font-semibold text-slate-500 leading-relaxed">
          Explore research sheets, therapeutic guides, medication journals, and clinical milestone reports compiled by our medical panel.
        </p>
      </div>

      {/* Filter and Search controls */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-4 rounded-3xl border border-slate-100 shadow-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1B7330] text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 pl-9 pr-4 py-2.5 rounded-xl text-xs font-semibold text-[#0A2240] outline-none focus:border-[#1B7330]/30"
          />
        </div>
      </section>

      {/* Blogs list grid */}
      {loading ? (
        <div className="text-center py-12 text-sm font-semibold text-slate-400">
          Syncing library records...
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-12 text-sm font-semibold text-slate-400">
          No resources found matching selection filters. Try selecting 'All' categories.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((b) => (
            <article 
              key={b.id} 
              onClick={() => setSelectedPost(b)}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="h-44 relative bg-slate-50 overflow-hidden border-b border-slate-100">
                  <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-[#0A2240]/90 text-[#9DDF8C] text-[9px] font-bold uppercase px-3 py-1 rounded-full border border-white/10">
                    {b.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-base font-extrabold text-[#0A2240] tracking-tight line-clamp-2 leading-snug group-hover:text-[#1B7330] transition-colors font-sans">
                    {b.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed line-clamp-3">
                    {b.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#1B7330]" /> By {b.authorName}
                </span>
                <span className="flex items-center gap-1.5 text-[#1B7330]">
                  <FileText className="w-3.5 h-3.5 text-[#1B7330]" /> Read Paper
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Expanded read model slider */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-slate-100">
            
            {/* Header image overlay */}
            <div className="h-64 relative bg-slate-50 border-b border-slate-150">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-[#0A2240] hover:bg-[#1B7330] text-white p-2 rounded-full cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Post details */}
            <div className="p-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-[#1B7330]">
                <span className="bg-[#1B7330]/10 px-3 py-1 rounded-full border border-[#1B7330]/20 uppercase tracking-widest">
                  {selectedPost.category}
                </span>
                <span className="text-slate-400 font-semibold tracking-wider uppercase">• Published by: {selectedPost.authorName}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2240] leading-tight tracking-tight font-sans">
                {selectedPost.title}
              </h2>

              {/* Sub-content */}
              <div className="text-xs md:text-sm font-semibold text-slate-500 leading-relaxed whitespace-pre-wrap font-sans border-t border-slate-100 pt-6">
                {selectedPost.content}
              </div>

              {/* Disclaimer */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[10px] font-bold text-slate-400 uppercase leading-relaxed tracking-wider">
                DISCLAIMER: This resource handbook is issued for educational guidelines only. Coordinate always with physical rehab clinics before implementing changes.
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="bg-[#1B7330] hover:bg-[#145A24] text-white font-bold text-xs px-6 py-2.5 rounded-full cursor-pointer transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
