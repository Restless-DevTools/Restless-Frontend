import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody, CardHeader,
  Col, Form, FormGroup,
  Input,
  InputGroup, InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import CardTitle from 'reactstrap/lib/CardTitle';
import useAuth from '../../contexts/AuthenticationContext';
import Logo from '../../components/Logo/Logo';
import useGlobal from '../../contexts/GlobalContext';

const RecoverPassword = (props) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { recoverPassword, validatePasswordStrenght } = useAuth();
  const { openSuccessNotification, openErrorNotification, openInfoNotification } = useGlobal();
  const [passwordStrenght, setPasswordStrenght] = useState({ label: 'none', color: 'text-dark', isPasswordStrong: false });

  const navigate = (path) => {
    props.history.push(path || '/auth/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordStrenght.isPasswordStrong) {
      openInfoNotification('Your password must contain at least 8 digits, 1 uppercase character, 1 lowercase character, 1 number and a special character', 'Recover password');
      return;
    }

    if (password !== confirmPassword) {
      openInfoNotification('Passwords entered do not match', 'Recover password');
      return;
    }

    const recoverData = {
      verificationCode, password,
    };

    const recoverInfo = await recoverPassword(recoverData);

    if (recoverInfo.isValid) {
      openSuccessNotification(recoverInfo.message, 'Recover password');
      props.history.push('/auth/login');
    } else {
      openErrorNotification(recoverInfo.message, 'Recover password');
    }
  };

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-secondary">
          <Logo />
        </CardHeader>
        <CardBody className="px-lg-5">
          <CardTitle tag="h3" className="text-center">Recover Password</CardTitle>
          <Form role="form" onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-key" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id="verificationCode"
                  name="verificationCode"
                  defaultValue={verificationCode}
                  placeholder="Verification code"
                  type="text"
                  onChange={(e) => { setVerificationCode(e.target.value); }}
                  maxLength={30}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-lock" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="off"
                  onChange={(e) => {
                    setPasswordStrenght(validatePasswordStrenght(e.target.value));
                    setPassword(e.target.value);
                  }}
                  maxLength={30}
                  required
                />
              </InputGroup>
            </FormGroup>
            <div className="text-muted ">
              <small className="font-italic">
                Password strength:
              </small>
              {' '}
              <small className={`font-weight-700 ${passwordStrenght && passwordStrenght.color}`}>
                {passwordStrenght && passwordStrenght.label}
              </small>
            </div>
            <div className="text-muted form-group">
              <small className="font-italic">
                Your password must contain at least:
              </small>
              <small>
                <ul>
                  <li>8 digits;</li>
                  <li>1 uppercase character;</li>
                  <li>1 lowercase character;</li>
                  <li>1 number;</li>
                  <li>1 special character;</li>
                </ul>
              </small>
            </div>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-lock" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Confirm password"
                  type="password"
                  autoComplete="off"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  maxLength={30}
                  required
                />
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button
                block
                className="my-2"
                color="primary"
                type="submit"
              >
                Change Password
              </Button>
            </div>
            <div className="text-center">
              <Button
                block
                className="text-muted"
                color="link"
                onClick={() => { navigate('/auth/login'); }}
              >
                <small>Remembered your password?</small>
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RecoverPassword;
