import { sanityStructure } from "@/types/siteSettings.type";
import Box from "./box";
import BoxMap from "./box.map";
import BoxError from "./box.error";
import Loading from "../../../components/loading";

type BoxPageProps = {
  sanityStructure: sanityStructure[];
  loading: boolean;
  data: Record<string, any> | undefined;
  selectedItem: sanityStructure | null;
  handleSelect: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  handleBack: () => void;
  updateData: (props: { reference: string; structure: Record<string, any> }) => Promise<boolean>;
  error: string | null;
  reset?: () => void;
}

export default function BoxPage({
  sanityStructure,
  loading,
  data,
  selectedItem,
  handleSelect,
  handleBack,
  updateData,
  error,
  reset
}: BoxPageProps) {

  const reload = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  }

  if (error) {
    return (
      <div className='[ pageBox ]'>
        <BoxError errorMessage={error} onClickFunc={reload} />
      </div>
    )
  }

  if (loading) {
    return (
      <div className='[ pageBox ]'>
        <Loading />
      </div>)
  }


  if (selectedItem && data) {
    return (
      <div className='[ pageBox ]'>
        <Box
          selectedStructure={selectedItem}
          data={data}
          clickHandler={handleBack}
          saveHandler={updateData}
        />
      </div>
    );
  }

  return (
    <div className='[ pageBox ]'>
      <BoxMap
        structureArray={sanityStructure}
        clickHandler={handleSelect}
      />
    </div>
  );
};
