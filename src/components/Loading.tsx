import { Spinner } from "react-bootstrap"


const Loading = () => {
    return (
        <>
        <Spinner animation="border" variant="primary">
            <span className="sr-only"></span>
        </Spinner> Loading...
        </>
    )
}

export default Loading