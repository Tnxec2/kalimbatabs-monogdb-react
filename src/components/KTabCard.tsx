import { FC, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { KTab } from '../models/KTab';
import { Rating } from './rating/rating';
import Song from './song/song';
import { Keys } from './keys/keys';


type Props = {
    onReload: () => void,
    ktab: KTab,
    readOnly: boolean
}
const KTabCard: FC<Props> = ({ktab, readOnly, onReload}) => {

    const [open, setOpen] = useState({edit:false, view:false})

    const handleClose = (reload: boolean) => {
        setOpen({edit:false, view:false})
        if (reload) onReload()
      }
    
    return (
        <>
        <ListGroup.Item
            as="li"
            className="align-items-center d-flex" style={{cursor:'pointer'}} >
                <div onClick={() => setOpen({...open, view: true, edit: false})} 
                    className='d-flex justify-content-between'
                    style={{width:'100%',alignItems:'center'}}
                >
                    <div >
                        <div className='font-weight-bolder'>{ktab.title}</div>
                        { ktab.interpreter?.length > 0 ? 
                        <div className="text-muted font-italic">{ktab.interpreter}</div> : '' }
                    </div>
                    <div>
                    <Rating title='' rating={ktab.difficulty} />
                    <Keys title='' keysCount={ktab.keysCount} />
                    </div>
                </div>
                { !readOnly ? <Button variant="outline-primary"
                    onClick={() => setOpen({...open, view: false, edit: true})} 
                    className="ms-3"
                    style={{height:'100%'}}>Edit</Button> : '' }

        </ListGroup.Item>
            {open.view &&
                <Song
                    onClose={handleClose} 
                    song={ktab} 
                    open={open.view}
                    readOnly={readOnly} />
            }
            {/* {open.edit &&
                <SongEditDialog
                    titleDialog='Edit Kalimba Tab'
                    onClose={handleClose} 
                    toEditTitle={ktab.title}
                    toEditInterpreter={ktab.interpreter}
                    toEditSongtext={ktab.text}
                    toEditSource={ktab.source}
                    toEditYoutube={ktab.youtube}
                    toEditDifficulty={ktab.difficulty}
                    toEditKeysCount={ktab.keysCount}
                    id={ktab._id}
                    open={open.edit} />
            } */}
        </>
    )
}

export default KTabCard