export function generateBaseMetadata({ 
  title, 
  description, 
  path, 
  type = 'website',
  image = '/og-image.png'
}) {
  const url = `https://reconshield.in${path === '/' ? '' : path}`;
  
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'ReconShield',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export const getCategoryFallbackImage = (categoryName) => {
  const name = (categoryName || '').toLowerCase().trim();
  if (name.includes('web-security') || name.includes('web security') || name.includes('cloud') || name.includes('ssl')) {
    return '/blog/ssl.png';
  }
  if (name.includes('osint') || name.includes('analysis')) {
    return '/blog/osint.png';
  }
  if (name.includes('network') || name.includes('assets') || name.includes('dns') || name.includes('email')) {
    return '/blog/dns.png';
  }
  if (name.includes('domain') || name.includes('surface') || name.includes('fraud')) {
    return '/blog/domain.png';
  }
  return '/blog/vuln.png';
};

