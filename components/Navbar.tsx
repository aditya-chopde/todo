import React from 'react'

const Navbar = () => {
  return (
    <>
     <nav className='lg:flex lg:flex-row lg:justify-around lg:items-center lg:my-3'>
        <div>
            <h1 className='lg:font-bold lg:text-xl'>Todo</h1>
        </div>
        <div>
            <ul className='lg:flex lg:flex-row lg:gap-3'>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
     </nav> 
    </>
  )
}

export default Navbar
