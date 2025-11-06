import { FC, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

type Props = {
    onSearch: (query: string) => void,
}

export const FindSong: FC<Props> = ({onSearch}) => {
    const [query, setQuery] = useState('')

    return (
        <InputGroup className="mt-3">
            <Form.Control 
                aria-label="search in title or interpreter" 
                placeholder="search in title or interpreter" 
                onChange={(e) => setQuery(e.target.value)} 
                value={query}
                onKeyDown={(e) => {if (e.key === "Enter") onSearch(query)} }
                />
            <Button variant="outline-primary" onClick={()=> { onSearch(query)}} >Find</Button>
            <Button variant="outline-danger" onClick={()=> { setQuery(''); onSearch('')}} >Clear</Button>
        </InputGroup>
    );
}