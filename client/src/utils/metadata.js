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
