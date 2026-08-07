export type ToolCategory =
  | 'osint'
  | 'dns'
  | 'whois'
  | 'domains'
  | 'networking'
  | 'ip-intelligence'
  | 'ssl-tls'
  | 'certificates'
  | 'email-security'
  | 'cryptography'
  | 'encoding'
  | 'hashing'
  | 'malware-analysis'
  | 'threat-intelligence'
  | 'ioc-analysis'
  | 'yara'
  | 'sigma'
  | 'windows'
  | 'linux'
  | 'cloud-security'
  | 'aws'
  | 'azure'
  | 'gcp'
  | 'containers'
  | 'kubernetes'
  | 'docker'
  | 'web-security'
  | 'api-security'
  | 'jwt'
  | 'authentication'
  | 'password-security'
  | 'forensics'
  | 'incident-response'
  | 'compliance'
  | 'siem'
  | 'mitre-attack'
  | 'blue-team'
  | 'red-team'
  | 'soc';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SecurityRecommendation {
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  title: string;
  description: string;
  remediationCode?: string;
}

export interface ToolMetadata {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  secondaryCategories?: ToolCategory[];
  tags: string[];
  iconName: string;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  isPopular?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  requiresBackend?: boolean;
  rfcs?: { number: number; title: string; url: string }[];
  cves?: string[];
  ports?: number[];
  protocols?: string[];
  faqs: FAQItem[];
  recommendations?: SecurityRecommendation[];
  relatedToolIds: string[];
  relatedBlogSlugs?: string[];
}

export interface CollectionMetadata {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  toolIds: string[];
  workflowSteps: { title: string; description: string; toolId: string }[];
}
