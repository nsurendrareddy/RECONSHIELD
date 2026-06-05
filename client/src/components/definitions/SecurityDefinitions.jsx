import React from 'react';

/**
 * SecurityDefinitions Component
 * Renders key security definitions as cards with schema.org DefinedTerm structured data.
 * 
 * @param {string} title - The heading title for the section
 * @param {string} description - The description or introduction text
 * @param {Array} definitions - The list of definitions { name, description }
 * @param {string} colorClass - Custom text color class for the term titles (Tailwind)
 */
export default function SecurityDefinitions({ 
  title, 
  description, 
  definitions = [], 
  colorClass = 'text-[#00ff88]' 
}) {
  if (!definitions || definitions.length === 0) return null;

  // Determine grid columns dynamically based on definition count
  const gridClass = definitions.length >= 3 
    ? 'grid grid-cols-1 md:grid-cols-3 gap-6 my-8' 
    : 'grid grid-cols-1 md:grid-cols-2 gap-6 my-8';

  return (
    <div className="my-10">
      {title && (
        <h2 className="text-2xl font-display font-bold text-white mb-4 uppercase tracking-wider">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-gray-400 leading-relaxed mb-6">
          {description}
        </p>
      )}
      
      <div className={gridClass}>
        {definitions.map((def, idx) => (
          <div 
            key={idx} 
            className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300"
            itemScope
            itemType="https://schema.org/DefinedTerm"
          >
            <h3 
              className={`${colorClass} font-mono font-bold text-sm mb-2`}
              itemProp="name"
            >
              {def.name}
            </h3>
            <p 
              className="text-xs text-gray-400 leading-relaxed font-sans"
              itemProp="description"
            >
              {def.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
