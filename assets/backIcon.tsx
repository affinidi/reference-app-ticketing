import { SVGAttributes } from 'react'

export default (props: SVGAttributes<SVGElement>) => (
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 11.018H6.256l3.977-4.32L8.667 5 2 12.222l6.667 7.222 1.566-1.697-3.977-4.321H22v-2.408z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
