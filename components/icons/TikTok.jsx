import * as React from "react"

function TikTokIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      strokeWidth={1.7}
      fill="#000"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21 8v8a5 5 0 01-5 5H8a5 5 0 01-5-5V8a5 5 0 015-5h8a5 5 0 015 5z"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12a3 3 0 103 3V6c.333 1 1.6 3 4 3"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default TikTokIcon
