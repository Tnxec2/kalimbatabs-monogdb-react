import { FC } from "react";
import { Form } from "react-bootstrap";

type Props = {
    setSortField: (sortField: string) => void,
    sortField: string
}
export const Sort: FC<Props> = ({sortField, setSortField}) => {
  return (
    <>
      <Form.Label className="me-3">sort by </Form.Label>
      <Form.Select
        aria-label="sort selection"
        defaultValue={sortField}
        size="sm"
        onChange={(e) => setSortField(e.target.value)}
      >
        <option value="title">title</option>
        <option value="interpreter">interpreter</option>
        <option value="updated">update time</option>
        <option value="difficulty">difficulty</option>
        <option value="difficulty_desc">difficulty desc</option>
      </Form.Select>
    </>
  );
};
