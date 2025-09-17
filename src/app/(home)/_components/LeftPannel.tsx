import React, { type PropsWithChildren } from "react"

const LeftPanel: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="bg-white dark:bg-blue-950 p-4 h-full max-w-2xl pr-0">{children}</div>
)

export default LeftPanel
