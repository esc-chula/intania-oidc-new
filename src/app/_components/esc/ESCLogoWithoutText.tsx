import type { SVGProps } from "react";

const ESCLogoWithoutText = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 114 133"
      width="100%"
      height="100%"
      fill="none"
      {...props}
    >
      <path
        fill={props.fill}
        d="m7.778 118.953-.1-20.078L45.25 60.686 0 0h113.459l.203 26.797-11.947-12.379H28.201l35.894 47.55-56.317 56.985ZM113.659 132.962l-105.761-.157-.02-3.106 61.64-60.68 8.877 11.656-37.339 37.915 60.246.087 12.357-11.824v26.109Z"
      />
    </svg>
  );
};

export default ESCLogoWithoutText;
