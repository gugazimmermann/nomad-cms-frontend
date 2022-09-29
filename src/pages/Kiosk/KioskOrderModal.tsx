import { Dispatch, ReactElement, SetStateAction } from "react";
import { ModalContentType } from "../../interfaces/types";

type ModalProps = {
  content: ModalContentType | undefined;
  setOrderModalContent: Dispatch<SetStateAction<ModalContentType | undefined>>;
};

const KioskOrderModal = ({ content, setOrderModalContent }: ModalProps): ReactElement => (
  <div
    className={`${
      !content ? "hidden" : "flex"
    } absolute top-20 left-1/2 transform -translate-x-1/2`}
  >
    <div className={`${content?.color} font-bold p-4 rounded-lg shadow-lg`}>
      <div className="flex flex-col gap-8">
      {content?.text}
      <button
      type="button"
      className="bg-white px-2 py-1 text-warning rounded-md"
      onClick={() => setOrderModalContent(undefined)}
      >Close</button>
      </div>
    </div>
  </div>
);

export default KioskOrderModal;
