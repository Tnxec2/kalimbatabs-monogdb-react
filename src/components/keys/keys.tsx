import { FC } from "react";
import styles from "./keys.module.css";
import { Badge, Stack } from "react-bootstrap";

type Props = {
  title: string;
  selectable?: boolean;
  keysCount?: number;
  onChange?: (keysCount: number) => void;
};

const aKeys = [8, 17, 21];

export const Keys: FC<Props> = ({
  title,
  selectable,
  keysCount = 17,
  onChange,
}) => {
  return selectable ? (
    <Stack direction="horizontal" gap={2}>
        {title}
      {aKeys.map((k) => (
        <Badge
          pill
          bg={keysCount === k ? "warning" : "secondary"}
          text={keysCount === k ? "dark" : "light"}
          onClick={() => onChange && onChange(k)}
          className={styles.clickable}
        >
          {k}
        </Badge>
      ))}
    </Stack>
  ) : (
    <Badge pill bg="secondary">
      {keysCount}
    </Badge>
  );
};
