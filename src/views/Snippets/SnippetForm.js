import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import {
  FormGroup, Row, Col, Input, Label, Button, Form,
} from 'reactstrap';
import useGlobal from '../../contexts/GlobalContext';

function SnippetForm(props) {
  const {
    snippet, requests, edit, toggleModal, getSnippets,
  } = props;

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

  const [shareOptions] = useState([
    { label: 'Private', value: 'PRIVATE' },
    { label: 'Public', value: 'PUBLIC' },
    { label: 'Team', value: 'TEAM' },
    { label: 'User', value: 'USER' },
  ]);

  const { openSuccessNotification, openErrorNotification, openInfoNotification } = useGlobal();
  const [language, setLanguage] = useState(props.snippet.language || 'javascript');
  const [code, setCode] = useState(snippet.code || '// Restless is awesome!');
  const [name, setName] = useState(snippet.name);
  const [description, setDescription] = useState(snippet.description);
  const [shareOption, setShareOption] = useState(
    shareOptions.find((opt) => opt.value === snippet.shareOption) || null,
  );
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState(null);

  const getAllTeams = async () => {
    try {
      const { data } = await requests.getAllTeams();

      if (data.length) {
        setTeams(data);

        if (snippet.teamId) {
          setTeam(data.find((opt) => opt.id === snippet.teamId));
        }
      }
    } catch (error) {
      openErrorNotification('Can not fetch the records in backend.', 'Teams');
    }
  };

  const finishProccess = () => {
    toggleModal(false);
    getSnippets();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!shareOption) {
        openInfoNotification('Select a share option', 'Snippet');
        return;
      }

      if (shareOption && shareOption.value === 'TEAM') {
        if (!team) {
          openInfoNotification('The team field must be filled', 'Collection');
          return;
        }
      }

      const sendObject = {
        code,
        name,
        description,
        language,
        shareOption: shareOption.value,
      };

      if (team) {
        sendObject.teamId = team.id;
      }

      if (edit) {
        await requests.editSnippet(snippet.id, sendObject);
        finishProccess();
        openSuccessNotification('Snippet updated Successfully', 'Snippet');
      } else {
        const { data } = await requests.createSnippet(sendObject);
        if (data.id) {
          finishProccess();
          openSuccessNotification('Snippet created Successfully', 'Snippet');
        }
      }
    } catch (error) {
      openErrorNotification('Something went wrong!');
    }
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  return (
    <div className="form-page">
      <Form onSubmit={handleSubmit}>
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
                required
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
                required
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
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                onChange={(value) => setShareOption(value)}
                placeholder="Share Snippet"
                value={shareOption}
                name="share"
              />
            </FormGroup>
          </Col>
        </Row>

        {(shareOption && shareOption.value === 'TEAM') && (
          <Row>
            <Col>
              <FormGroup>
                <Label for="team">Teams:</Label>
                <Select
                  options={teams}
                  getOptionLabel={(value) => value.name}
                  getOptionValue={(value) => value.id}
                  onChange={(value) => setTeam(value)}
                  placeholder="Select the team"
                  defaultValue={team}
                  value={team}
                  name="team"
                  isClearable
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
                type="submit"
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
      </Form>
    </div>
  );
}

export default SnippetForm;
