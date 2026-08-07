import { TOOLS_REGISTRY } from '@/registry/tools';
import { ToolMetadata } from '@/types/tool';

export function getRelatedTools(currentTool: ToolMetadata, limit = 4): ToolMetadata[] {
  return TOOLS_REGISTRY
    .filter(t => t.id !== currentTool.id)
    .map(t => {
      let score = 0;
      if (t.category === currentTool.category) score += 3;
      if (t.secondaryCategories?.includes(currentTool.category)) score += 2;
      const sharedTags = t.tags.filter(tag => currentTool.tags.includes(tag)).length;
      score += sharedTags * 2;
      if (t.protocols?.some(p => currentTool.protocols?.includes(p))) score += 4;
      return { tool: t, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.tool);
}
