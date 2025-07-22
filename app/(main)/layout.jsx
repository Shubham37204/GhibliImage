import React from 'react'

// ERROR: Component name should start with uppercase letter (PascalCase)
// SOLUTION: Rename 'layout' to 'Layout' to follow React component naming convention
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f8f6f2] text-gray-900">{children}</div>
  )
}

export default Layout