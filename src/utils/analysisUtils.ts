export function extractMissingPoints(analysis: string): string[] {
  const sections = analysis.split('\n\n');
  const technicalGapsSection = sections.find(section => 
    section.toLowerCase().includes('technical gaps') || 
    section.toLowerCase().includes('missing')
  );

  if (!technicalGapsSection) return [];

  return technicalGapsSection
    .split('\n')
    .slice(1) // Skip the section title
    .map(point => point.trim())
    .filter(point => point.startsWith('-'))
    .map(point => point.slice(2).trim()) // Remove the bullet point
    .filter(Boolean);
}