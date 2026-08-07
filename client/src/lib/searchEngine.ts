import { TOOLS_REGISTRY } from '@/registry/tools';
import { CATEGORIES } from '@/registry/categories';
import { ToolMetadata } from '@/types/tool';

export interface SearchResultItem {
  type: 'tool' | 'category' | 'port' | 'cve' | 'ip' | 'hash';
  title: string;
  subtitle: string;
  url: string;
  iconName: string;
  badge?: string;
}

export function parseAndExecuteSearch(query: string): SearchResultItem[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const results: SearchResultItem[] = [];

  // 1. Detect IPv4 / IPv6
  if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(clean)) {
    results.push({
      type: 'ip',
      title: `Lookup IP: ${clean}`,
      subtitle: 'Query geolocation, ISP, and ASN routing intelligence',
      url: `/tools/ip-lookup/${clean}`,
      iconName: 'Radio',
      badge: 'IP Query'
    });
  }

  // 2. Detect Port Number
  if (/^\d{1,5}$/.test(clean) && parseInt(clean, 10) <= 65535) {
    const port = parseInt(clean, 10);
    results.push({
      type: 'port',
      title: `Port ${port} Intelligence`,
      subtitle: `View security risks and common service defaults for TCP port ${port}`,
      url: `/ports/${port}`,
      iconName: 'Terminal',
      badge: 'Port Info'
    });
  }

  // 3. Detect CVE Identifier
  if (/^cve-\d{4}-\d{4,}$/i.test(clean)) {
    const cveUpper = clean.toUpperCase();
    results.push({
      type: 'cve',
      title: `CVE Record: ${cveUpper}`,
      subtitle: 'View exploit prediction score (EPSS), CVSS vector, and remediation',
      url: `/cve/${cveUpper}`,
      iconName: 'ShieldAlert',
      badge: 'CVE Vulnerability'
    });
  }

  // 4. Fuzzy Match Tools
  const matchingTools = TOOLS_REGISTRY.filter(tool => {
    return (
      tool.name.toLowerCase().includes(clean) ||
      tool.tagline.toLowerCase().includes(clean) ||
      tool.description.toLowerCase().includes(clean) ||
      tool.tags.some(tag => tag.toLowerCase().includes(clean))
    );
  });

  matchingTools.forEach(tool => {
    results.push({
      type: 'tool',
      title: tool.name,
      subtitle: tool.tagline,
      url: `/tools/${tool.slug}`,
      iconName: tool.iconName,
      badge: tool.category.toUpperCase()
    });
  });

  // 5. Match Categories
  const matchingCategories = CATEGORIES.filter(cat => {
    return cat.name.toLowerCase().includes(clean) || cat.description.toLowerCase().includes(clean);
  });

  matchingCategories.forEach(cat => {
    results.push({
      type: 'category',
      title: `${cat.name} Category`,
      subtitle: cat.description,
      url: `/tools/${cat.slug}`,
      iconName: cat.iconName,
      badge: 'Category'
    });
  });

  return results;
}
