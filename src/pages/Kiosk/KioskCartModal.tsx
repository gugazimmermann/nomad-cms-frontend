import { ReactElement } from "react";
import { ModalContentType } from "../../interfaces/types";

type ModalProps = {
  content: ModalContentType | undefined;
};

const KioskCartModal = ({ content }: ModalProps): ReactElement => (
  <div
    className={`${
      !content ? "hidden" : "flex"
    } absolute top-12 left-1/2 transform -translate-x-1/2`}
  >
    <div className={`${content?.color} font-bold p-4 rounded-lg shadow-lg`}>
      {content?.text}
    </div>
  </div>
);

export default KioskCartModal;
