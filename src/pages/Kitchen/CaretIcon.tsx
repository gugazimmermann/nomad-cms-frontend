import { ReactElement } from 'react';

type CaretIconProps = {
  rotate?: boolean;
}

const CaretIcon = ({rotate}: CaretIconProps): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${rotate && 'rotate-180'}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 10l6 6l6 -6h-12" />
    </svg>
  );
};

export default CaretIcon;
