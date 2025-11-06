import Modal from "../modal/modal";
import { faGlobe, faVideo } from "@fortawesome/free-solid-svg-icons"
import { FC, useState } from "react";
import styles from "./editsong.module.css";
import { Rating } from "../rating/rating";
import { Keys } from "../keys/keys";
import { Button, Form, InputGroup } from "react-bootstrap";
import Info from "./info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Config } from "../../config/Config";
import { useAuth } from "../../context/AuthContext";
import { KTabInsert, useRestApi } from "../../context/RestApiContext";

type Props = {
  titleDialog: string,
  open: boolean;
  onClose: (reload: boolean) => void;
  toEditTitle?: string;
  toEditInterpreter?: string;
  toEditSource?: string;
  toEditYoutube?: string;
  toEditSongtext?: string;
  toEditKeysCount?: number;
  toEditDifficulty?: number;
  id?: string;
};

const SongEditDialog: FC<Props> = ({
  titleDialog,
  open,
  onClose,
  toEditTitle,
  toEditInterpreter,
  toEditSource,
  toEditYoutube,
  toEditSongtext,
  toEditDifficulty,
  toEditKeysCount,
  id,
}) => {
  const { token } = useAuth();
  const { insertKTab, updateKTab } = useRestApi();

  const [title, setTitle] = useState(toEditTitle);
  const [interpreter, setInterpreter] = useState(toEditInterpreter);
  const [source, setSource] = useState(toEditSource);
  const [youtube, setYoutube] = useState(toEditYoutube);
  const [text, setText] = useState(toEditSongtext);
  const [difficulty, setDifficulty] = useState(toEditDifficulty);
  const [keysCount, setKeysCount] = useState(toEditKeysCount);

  /* function to update firestore */
  const handleUpdate = async (e: any) => {
    e.preventDefault();

    if (!title || title.trim().length === 0) {
      alert("Enter title text");
      return;
    }
    if (!text || text.trim().length === 0) {
      alert("Enter song text");
      return;
    }

    const kTab: KTabInsert = {
      title: title,
      interpreter: interpreter || "",
      source: source || "",
      youtube: youtube || "",
      text: text,
      difficulty: difficulty || 1,
      keysCount: keysCount || Config.defaultKeysCount,
    };

    if (token) {
      if (id) {
        updateKTab(id, kTab, token)
        .then(() => {
          onClose(true);
        })
        .catch((err) => {
          alert(err);
          onClose(false);
        });
      } else {
        insertKTab(kTab, token)
        .then (()=>{
          onClose(true)
        })
        .catch ((err) => {
          alert(err)
          onClose(false)
        })
      }
    }
  };

  return (
    <Modal modalLabel={titleDialog} onClose={onClose} open={open}>
      <Rating
        title="Difficulty: "
        rating={difficulty}
        onChange={setDifficulty}
      />
      <Keys
        title="Keys count: "
        keysCount={keysCount}
        selectable={true}
        onChange={setKeysCount}
      />
      <Form onSubmit={handleUpdate} className={styles.editSong}>
        <Form.Control
          name="title"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <Form.Control
          name="interpreter"
          placeholder="interpreter"
          onChange={(e) => setInterpreter(e.target.value)}
          value={interpreter}
        />

        <Form.Control as="textarea" onChange={(e) => setText(e.target.value)}
          placeholder="Enter song text"
          value={text} />

        <InputGroup className="mb-3">
          <InputGroup.Text ><FontAwesomeIcon icon={faGlobe} /></InputGroup.Text>
          <Form.Control
            type="url"
            name="source"
            placeholder="source"
            aria-label="source"
            onChange={(e) => setSource(e.target.value)}
            value={source}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text ><FontAwesomeIcon icon={faVideo} /></InputGroup.Text>
          <Form.Control
            type="url"
            name="youtube"
            placeholder="youtube"
            aria-label="youtube"
            onChange={(e) => setYoutube(e.target.value)}
            value={youtube}
          />
        </InputGroup>

        <Button variant="secondary" onClick={() => onClose(false)}>
          Cancel
        </Button>
        <Button variant="success" type="submit">
          Save
        </Button>
      </Form>
      <Info />
    </Modal>
  );
};

export default SongEditDialog;
