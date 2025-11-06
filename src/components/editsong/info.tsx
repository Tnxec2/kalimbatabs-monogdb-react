import { FC } from "react";
import { Alert } from "react-bootstrap";

type Props = {};

const Info: FC<Props> = () => {
  return (
    <Alert variant="info" className="mt-3">
      <dl className="grid">
        <dt>&gt; at the beginning of the line</dt>
        <dd>marker for song text line </dd>
        <dt>Bracket [ ] </dt>
        <dd>Glissando</dd>
        <dt>Hyphen –</dt>
        <dd>Chord</dd>
        <dt>Parentheses ( )</dt>
        <dd>Notes not part of melody</dd>
        <dt>Tilde ~</dt>
        <dd>Sustain</dd>
      </dl>
    </Alert>
  );
};

export default Info;
