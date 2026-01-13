'use client';

import { ArrowLeft, Construction } from 'lucide-react';
import Link from 'next/link';

interface WireframePageProps {
  title: string;
  route: string;
  description: string;
  sections?: string[];
  ctas?: { label: string; href: string }[];
  epic?: string;
}

export function WireframePage({
  title,
  route,
  description,
  sections = [],
  ctas = [],
  epic,
}: WireframePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Dev Header */}
      <div className="bg-amber-100 border-b border-amber-200 px-4 py-2">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-amber-800">
            <Construction className="w-4 h-4" />
            <span className="font-medium">Wireframe Template</span>
          </div>
          {epic && (
            <span className="text-amber-700 font-mono text-xs">{epic}</span>
          )}
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            <code className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-mono">
              {route}
            </code>
          </div>
          <p className="text-slate-600 text-lg">{description}</p>
        </div>

        {/* Sections */}
        {sections.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Planned Sections
            </h2>
            <ul className="space-y-3">
              {sections.map((section, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  {section}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTAs */}
        {ctas.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Primary Actions
            </h2>
            <div className="flex flex-wrap gap-3">
              {ctas.map((cta, index) => (
                <Link
                  key={index}
                  href={cta.href}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Placeholder Content Area */}
        <div className="mt-8 border-2 border-dashed border-slate-300 rounded-xl p-12 text-center">
          <Construction className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">
            Page content will be implemented here
          </p>
          <p className="text-slate-400 text-sm mt-2">
            This is a wireframe placeholder for development
          </p>
        </div>
      </div>
    </div>
  );
}
