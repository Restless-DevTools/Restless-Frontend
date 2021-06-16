import React, { useEffect, useState } from 'react';
import {
  Button, Col, Modal, ModalFooter, ModalHeader, Row, ModalBody,
} from 'reactstrap';

const DefaultConfirmationModal = (props) => {
  const {
    isOpen,
    className,
    toggleModal,
    confirmText,
    confirmAction,
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
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader className="px-4" tag="h2" toggle={toggle}>Confirm?</ModalHeader>
      <ModalBody className="py-1 px-4">
        {confirmText}
      </ModalBody>
      <ModalFooter>
        <Row>
          <Col>
            <Button onClick={toggle} color="danger" type="button">
              Discard
            </Button>
            {confirmAction && (
            <Button
              color="success"
              type="submit"
              onClick={() => {
                confirmAction();
                toggle();
              }}
            >
              Confirm
            </Button>
            )}
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  );
};

export default DefaultConfirmationModal;
