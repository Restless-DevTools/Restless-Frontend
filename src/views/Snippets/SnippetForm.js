import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import {
  FormGroup, Row, Col, Input, Label, Button,
} from 'reactstrap';

function SnippetForm(props) {
  const {
    snippet, requests, edit, toggleModal, getSnippets,
  } = props;
  const [language, setLanguage] = useState(props.snippet.language || 'javascript');

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

  const [code, setCode] = useState(snippet.code || '// Restless is awesome!');
  const [name, setName] = useState(snippet.name);
  const [description, setDescription] = useState(snippet.description);

  const [shareOptions] = useState([
    { label: 'Private', value: 'PRIVATE' },
    { label: 'Public', value: 'PUBLIC' },
    { label: 'Team', value: 'TEAM' },
    { label: 'User', value: 'USER' },
  ]);

  const [shareOption, setShareOption] = useState(snippet.shareOption);

  const handleSubmit = async () => {
    const sendObject = {
      code, name, description, language, shareOption,
    };

    if (edit) {
      await requests.editSnippet(snippet.id, sendObject);
    } else {
      await requests.createSnippet(sendObject);
    }

    toggleModal(false);
    getSnippets();
  };

  console.log(language);

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
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
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
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={languages.find((opt) => opt.value === language)}
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
              value={shareOptions.find((opt) => opt.value === shareOption)}
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
            defaultValue={code}
            onChange={(value) => setCode(value)}
            value={code}
          />
        </Col>
      </Row>

      <div className="action-pane">
        <Row>
          <Col md="6">
            <Button
              color="success"
              type="button"
              onClick={() => handleSubmit()}
            >
              Save
            </Button>

            <Button
              color="danger"
              type="button"
              onClick={() => toggleModal(false)}
            >
              Discard
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default SnippetForm;
