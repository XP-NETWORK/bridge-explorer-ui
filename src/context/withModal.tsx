import React, { useState } from "react";
import Modal from "../components/elements/modal";

const withModal = (modalScernario: () => JSX.Element) => (Wrapped:React.FC) => (props:any) => {
  const [state, setState] = useState({
    opened: false,
    afrerModalCb: null,
    scenario: null,
  });

  const openModal = () => {
    setState({ ...state, opened: true });
  };

  const closeModal = () => {
    setState({ ...state, opened: false});
  };

  return <>
      {state.opened && <Modal
          onClose={() => setState({ ...state, opened: false })}
        >
          {modalScernario}
        </Modal>
      }
      <Wrapped {...props} openModal={openModal} onCloseModal={closeModal} />
    </>
  
};

export default withModal;
