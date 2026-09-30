import { JsonLd } from './json-ld';

interface FAQSchemaProps {
  questions: { question: string; answer: string }[];
}

/** Schema.org FAQPage JSON-LD. Only include Q&As that are visible on the page. */
export function FAQSchema({ questions }: FAQSchemaProps) {
  if (!questions.length) return null;

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      }}
    />
  );
}
