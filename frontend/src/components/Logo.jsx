import React from 'react'

const Logo = ({ className = "w-44", onClick }) => {
  return (
    <div 
      className={`${className} cursor-pointer flex items-center`}
      onClick={onClick}
    >
      <h1 className="text-2xl font-bold text-primary">
        Neura<span className="text-white">Well</span>
      </h1>
    </div>
  )
}

export default Logo