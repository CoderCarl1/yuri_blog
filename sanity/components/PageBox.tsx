import { StructureBuilder } from 'sanity/structure';
import { useEffect, useState } from 'react';
import { SanityDocument } from 'sanity';
import { documentFetch } from '../lib/fetch.client';

type TchildPage = {
  title: string;
  id: string;
};

type MainProps = {
  childrenPages: TchildPage[];
  structure: StructureBuilder;
};

const Main: React.FC<MainProps> = ({ childrenPages, structure }) => {
  const [selectedItem, setSelectedItem] = useState<TchildPage | null>(null);

  const handleSelect = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const { textContent, dataset: { id } } = event.currentTarget;

    if (textContent && id) {
      setSelectedItem({ title: textContent, id });
    }
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      {selectedItem ? (
        <Box selectedChild={selectedItem} clickHandler={handleBack} />
      ) : (
        <BoxMap arr={childrenPages} clickHandler={handleSelect} />
      )}
    </div>
  );
};

type BoxMapProps = {
  arr: TchildPage[];
  clickHandler: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
};

const BoxMap: React.FC<BoxMapProps> = ({ arr = [], clickHandler }) => {
  return (
    <>
      {arr.map(({ title, id }) => (
        <button data-id={id} key={id} onClick={clickHandler}>
          {title}
        </button>
      ))}
    </>
  );
};

type BoxProps = {
  selectedChild: TchildPage;
  clickHandler: () => void;
};

const Box: React.FC<BoxProps> = ({ selectedChild, clickHandler }) => {
  return (
    <>
      <button onClick={clickHandler}>Back</button>
      <BoxComponent documentId={selectedChild.id} />
    </>
  );
};

type BoxComponentProps = {
  documentId: string;
};

const BoxComponent: React.FC<BoxComponentProps> = ({ documentId }) => {
  const [data, setData] = useState<SanityDocument | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const doc = await documentFetch(documentId);
        setData(doc || null);
      } catch (err) {
        setError('Failed to fetch document');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [documentId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* Render the document content using a generic renderer */}
      <RenderDocument document={data} />
    </div>
  );
};

type RenderDocumentProps = {
  document: SanityDocument | null;
};

const RenderDocument: React.FC<RenderDocumentProps> = ({ document }) => {
  if (!document) return null;

  return (
    <div>
      {/* Render each field of the document */}
      {Object.keys(document).map((key) => (
        <div key={key}>
          <strong>{key}:</strong> {JSON.stringify(document[key], null, 2)}
        </div>
      ))}
    </div>
  );
};

export default Main;