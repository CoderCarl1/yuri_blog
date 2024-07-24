import { type componentParamsType } from '../adminStructure/sanity.types';

export default function JsonPreview({ document }: componentParamsType) {
  const { displayed } = document;
  const title = displayed?.title || 'title not found';
  return (
    <div>
      <h1>JSON Data for "{title}"</h1>
      <pre>{JSON.stringify(displayed, null, 2)}</pre>
    </div>
  );
}
