import React from "react";
import { Flex } from "antd";

interface CardContainerProps {
  children: React.ReactNode;
  isSelect?: boolean;
  setItem?: () => void;
  upload?: () => void;
}

const borderStyle = "3px solid #C0C0C0";
const hoverBorderStyle = "3px solid rgb(255, 136, 46)";

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  isSelect,
  setItem,
  upload,
}) => {
  const [hover, setHover] = React.useState(false);

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        width: "100%",
        height: "100%",
        border: hover || isSelect ? hoverBorderStyle : borderStyle,
        borderRadius: 5,
        cursor: "pointer",
      }}
      onClick={() => {
        if (setItem) {
          setItem();
        }
        if (upload) {
          upload();
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </Flex>
  );
};

export default CardContainer;
