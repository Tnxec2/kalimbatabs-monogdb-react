import { faGlobe, faVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, useMemo } from "react"
import { Button } from "react-bootstrap"

import { KTab } from "../../models/KTab"
import { Rating } from "../rating/rating"
import Modal from "./../modal/modal"
import styles from './song.module.css'
import { Keys } from "../keys/keys"
import { useRestApi } from "../../context/RestApiContext"
import { useAuth } from "../../context/AuthContext"

type Props = {
    onClose: (reload: boolean) => void,
    open: boolean,
    song: KTab,
    readOnly: Boolean
}

const Song:FC<Props> = ({onClose, open, song, readOnly}) => {
  
  const { token} = useAuth();
  const { deleteKTab } = useRestApi();

  /* function to remove text line markers */
  const viewText = useMemo<string>(
    () => {
    return song.text.split("\n").map((line) => line.startsWith(">") ? line.substring(1, line.length) : line ).join("\n")
    }, [song.text])

  /* function to delete a document from mongodb */ 
  const handleDelete = async () => {
    if (!window.confirm('Are you sure to delete this song?')) return
    
    if ( token ) {
      deleteKTab(song._id, token)
        .then(
          () => onClose(true)
        )
        .catch((err) => alert(err))
    }
  }

  return (
    <Modal modalLabel={song.title} onClose={onClose} open={open}>
      <div title="Interpreter" className={styles.interpreter}>{ song.interpreter?.length > 0 ? song.interpreter : 'unknown' }</div>
      <Rating title="Difficulty: " rating={song.difficulty} />
      <Keys title="Keys count: " keysCount={song.keysCount} />
      <div className={styles.song}>
        <div className={styles.song_songtext}>{viewText}</div>
        <div>
          { song.source?.length > 0 ? <div><FontAwesomeIcon icon={faGlobe} /> <a href={song.source}>{song.source}</a></div> : ''}
          { song.youtube?.length > 0 ? <div><FontAwesomeIcon icon={faVideo} /> <a href={song.youtube}>{song.youtube}</a></div> : ''}
        </div>
        <div className={styles.song_buttons}>
        { !readOnly ? <>
            <Button variant="outline-danger" onClick={handleDelete}>Delete</Button> 
          </>
          : '' }
        </div>
      </div>
    </Modal>
  )
}

export default Song