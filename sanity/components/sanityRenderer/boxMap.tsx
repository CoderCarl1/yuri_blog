import Button from "@/components/Button";
import { sanityStructure } from "@/types/siteSettings.type";

type BoxMapProps = {
    structureArray: sanityStructure[];
    clickHandler: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  };
  
  export const BoxMap: React.FC<BoxMapProps> = ({ structureArray = [], clickHandler }) => {
    return (
      <div className='grid grid-cols-3 gap-4'>
        {structureArray.map(({ name }) => (
          <Button data-name={name} key={name} onClick={clickHandler}>
            {name}
          </Button>
        ))}
      </ div>
    );
  };
  