import React, { useEffect, useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

const ModalExample = (props) => {
  const {
    isOpen,
    className,
    title,
  } = props;

  const [modal, setModal] = useState(isOpen);

  useEffect(() => {
    setModal((props.isOpen));
  }, [props]);

  const toggle = () => {
    const newModalState = !modal;
    setModal(newModalState);
    props.toggleModal(newModalState);
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {props.children}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
          {props.confirmButton
          && (
            props.confirmButton
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
