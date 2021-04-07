import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import {
  FormGroup, Row, Col, Input, Label, Button,
} from 'reactstrap';

function SnippetForm(props) {
  const { toggleModal } = props;

  const [language, setLanguage] = useState('javascript');

  const [languages] = useState([
    { label: 'TypeScript', value: 'typescript' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'CSS', value: 'css' },
    { label: 'LESS', value: 'less' },
    { label: 'SCSS', value: 'scss' },
    { label: 'JSON', value: 'json' },
    { label: 'HTML', value: 'html' },
    { label: 'XML', value: 'xml' },
    { label: 'PHP', value: 'php' },
    { label: 'Razor', value: 'razor' },
    { label: 'C#', value: 'csharp' },
    { label: 'C++', value: 'cpp' },
    { label: 'Markdown', value: 'markdown' },
    { label: 'Diff', value: 'diff' },
    { label: 'Java', value: 'java' },
    { label: 'VB', value: 'vb' },
    { label: 'CoffeeScript', value: 'coffeescript' },
    { label: 'Handlebars', value: 'handlebars' },
    { label: 'Batch', value: 'batch' },
    { label: 'Pug', value: 'pug' },
    { label: 'F#', value: 'fsharp' },
    { label: 'Lua', value: 'lua' },
    { label: 'Powershell', value: 'powershell' },
    { label: 'Python', value: 'python' },
    { label: 'Ruby', value: 'ruby' },
    { label: 'SASS', value: 'sass' },
    { label: 'R', value: 'r' },
    { label: 'Objective-C', value: 'objective-c' },
    { label: 'PL/SQL', value: 'sql' },
    { label: 'GO', value: 'go' },
  ]);

  const [code, setCode] = useState('');

  const [shareOptions] = useState([
    { label: 'Private', value: 'private' },
    { label: 'Public', value: 'public' },
    { label: 'Team', value: 'team' },
    { label: 'User', value: 'user' },
  ]);

  const [shareOption, setShareOption] = useState('private');

  return (
    <div className="form-page">
      <Row>
        <Col md="6">
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input
              id="name"
              placeholder="Select a name for your snippet"
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <Label for="description">Description:</Label>
            <Input
              id="description"
              placeholder="Write a description for your colleagues understand what you wrote!"
              type="text"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <FormGroup>
            <Label for="language">Language:</Label>
            <Select
              options={languages}
              onChange={(evt) => setLanguage(evt.value)}
              placeholder="Select Language"
              value={languages.filter((opt) => opt.value === language)}
              name="language"
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <Label for="share">Share:</Label>
            <Select
              options={shareOptions}
              onChange={(evt) => setShareOption(evt.value)}
              placeholder="Share Snippet"
              value={shareOptions.filter((opt) => opt.value === shareOption)}
              name="share"
            />
          </FormGroup>
        </Col>
      </Row>

      {shareOption === 'team' && (
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="team">Team:</Label>
              <Select
                options={[{ value: 'Restless', label: 'Restless' }]}
                placeholder="Select your team"
                name="team"
              />
            </FormGroup>
          </Col>
        </Row>
      )}

      <Row>
        <Col md="12">
          <Editor
            height="50vh"
            theme="vs-dark"
            language={language}
            defaultValue="// Restless is awesome!"
            onChange={(value) => setCode(value)}
            value={code}
          />
        </Col>
      </Row>

      <div className="action-pane">
        <Row>
          <Col md="6">
            <Button color="success" type="button">
              Save
            </Button>
            <Button onClick={toggleModal} color="danger" type="button">
              Discard
            </Button>
          </Col>
        </Row>
      </div>

    </div>
  );
}

export default SnippetForm;
