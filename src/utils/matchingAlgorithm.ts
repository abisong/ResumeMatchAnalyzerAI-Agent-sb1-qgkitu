import { ResumeMatch } from '../types';

// Technical keywords and their categories
const TECHNICAL_CATEGORIES = {
  languages: new Set(['python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'ruby', 'go', 'rust', 'php', 'scala', 'kotlin', 'swift']),
  frameworks: new Set(['react', 'angular', 'vue', 'django', 'flask', 'spring', 'express', 'nestjs', 'rails', 'laravel']),
  databases: new Set(['sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch', 'cassandra', 'dynamodb']),
  cloud: new Set(['aws', 'azure', 'gcp', 'kubernetes', 'docker', 'terraform', 'jenkins', 'gitlab']),
  concepts: new Set(['api', 'rest', 'graphql', 'microservices', 'ci/cd', 'tdd', 'agile', 'devops'])
};

const TECHNICAL_KEYWORDS = new Set([
  ...Array.from(TECHNICAL_CATEGORIES.languages),
  ...Array.from(TECHNICAL_CATEGORIES.frameworks),
  ...Array.from(TECHNICAL_CATEGORIES.databases),
  ...Array.from(TECHNICAL_CATEGORIES.cloud),
  ...Array.from(TECHNICAL_CATEGORIES.concepts)
]);

function extractTechnicalTerms(text: string): string[] {
  const words = text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  const technicalTerms = new Set<string>();
  
  // Single word technical terms
  words.forEach(word => {
    if (TECHNICAL_KEYWORDS.has(word)) {
      technicalTerms.add(word);
    }
  });
  
  // Multi-word technical terms
  for (let i = 0; i < words.length - 1; i++) {
    const twoWords = `${words[i]} ${words[i + 1]}`;
    if (TECHNICAL_KEYWORDS.has(twoWords)) {
      technicalTerms.add(twoWords);
    }
  }
  
  return Array.from(technicalTerms);
}

export function calculateMatch(jobDescription: string, resume: string): ResumeMatch {
  const jdTechnicalTerms = extractTechnicalTerms(jobDescription);
  const resumeTechnicalTerms = new Set(extractTechnicalTerms(resume));

  const matchedKeywords = jdTechnicalTerms.filter(term => resumeTechnicalTerms.has(term));
  const missingKeywords = jdTechnicalTerms.filter(term => !resumeTechnicalTerms.has(term));

  const percentage = jdTechnicalTerms.length > 0
    ? Math.round((matchedKeywords.length / jdTechnicalTerms.length) * 100)
    : 0;

  return {
    percentage: Math.min(100, percentage),
    matchedKeywords,
    missingKeywords
  };
}