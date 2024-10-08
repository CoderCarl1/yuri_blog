import Button from '@/components/Button';
import { sanityStructure } from '@/types/sanity.type';

type BoxMapProps = {
  structureArray: sanityStructure[];
  clickHandler: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
};

export default function BoxMap({
  structureArray = [],
  clickHandler,
}: BoxMapProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {structureArray.map(({ name }) => (
        <Button data-name={name} key={name} onClick={clickHandler}>
          {name}
        </Button>
      ))}
    </div>
  );
}
