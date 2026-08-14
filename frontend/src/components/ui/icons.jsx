// components/ui/icons.jsx
import { GitBranch, Loader2 } from "lucide-react"

export const Icons = {
  github: (props) => <GitBranch className="h-5 w-5" {...props} />,
  spinner: (props) => <Loader2 className="h-4 w-4 animate-spin" {...props} />,
  google: (props) => (
    <svg
      {...props}
      viewBox="0 0 488 512"
      className={`h-5 w-5 ${props.className || ""}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M488 261.8c0-17.8-1.6-35-4.6-51.6H249v97.7h134.5c-5.8 31-23.2 57.3-49.5 75v62.2h79.8c46.7-43 74.2-106.3 74.2-183.3z" fill="#4285F4"/>
      <path d="M249 492c66.6 0 122.4-22.1 163.2-60l-79.8-62.2c-22 14.8-50.3 23.5-83.4 23.5-64 0-118.2-43.2-137.7-101.2H30v63.4C70.8 435.6 154.2 492 249 492z" fill="#34A853"/>
      <path d="M111.3 291.1C106.3 276.3 103.4 260.7 103.4 244.5s2.9-31.8 7.9-46.6V134.5H30c-17.2 34.5-27 73.1-27 110s9.8 75.5 27 110l81.3-63.4z" fill="#FBBC05"/>
      <path d="M249 97.9c36.3 0 68.8 12.5 94.5 37l70.9-70.9C371.4 27.4 317.5 5 249 5 154.2 5 70.8 61.4 30 134.5l81.3 63.4C130.8 141.1 185 97.9 249 97.9z" fill="#EA4335"/>
    </svg>
  ),
}
