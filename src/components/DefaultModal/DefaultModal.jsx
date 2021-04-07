import React, { useEffect, useState } from 'react';
import {
  Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';

const ModalExample = (props) => {
  const {
    children,
    isOpen,
    className,
    title,
    toggleModal,
    confirmButton,
  } = props;

  const [modal, setModal] = useState(isOpen);

  useEffect(() => {
    setModal((props.isOpen));
  }, [props]);

  const toggle = () => {
    const newModalState = !modal;
    setModal(newModalState);
    toggleModal(newModalState);
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader tag="h2" toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        {confirmButton
          && (
          <ModalFooter>
            confirmButton
          </ModalFooter>
          )}
      </Modal>
    </div>
  );
};

export default ModalExample;
