import ReactDom from "react-dom";
import close from "../../assets/img/close.svg";

const Modal = ({
  children,
  onClose,
}: {
  children: any;
  onClose?: () => void;
}) => {
  const portalDiv = document.getElementById("portal");

  return (
    portalDiv &&
    ReactDom.createPortal(
      <>
        <div onClick={onClose} />
        <div className="csvModal z-50">
          {onClose && (
            <img
              src={close}
              className="closeModal"
              alt="close"
              onClick={onClose}
            />
          )}
          {children({
            onClose,
          })}
        </div>
      </>,
      portalDiv
    )
  );
};

export default Modal;
