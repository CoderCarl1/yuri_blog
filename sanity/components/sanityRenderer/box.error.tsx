import Button from '@/components/Button';

type BoxErrorProps = {
  errorMessage: string;
  onClickFunc?: (event?: React.SyntheticEvent<HTMLButtonElement>) => void;
};

export default function BoxError({ errorMessage, onClickFunc }: BoxErrorProps) {
  const handleOnClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    if (onClickFunc) {
      onClickFunc(event);
    }
  };

  return (
    <>
      <p>Error loading settings: {errorMessage}</p>
      {onClickFunc && (
        <div>
          <Button onClick={handleOnClick}>Reload</Button>
        </div>
      )}
    </>
  );
}
