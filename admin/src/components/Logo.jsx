import React from 'react'

const Logo = ({ className = "w-36 sm:w-40", onClick }) => {
  return (
    <div 
      className={`${className} cursor-pointer flex items-center`}
      onClick={onClick}
    >
      <h1 className="text-xl font-bold text-primary">
        Neura<span className="text-white">Well</span>
      </h1>
    </div>
  )
}

export default Logo