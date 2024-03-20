import React from 'react'
import BlogContainer from '../components/BlogContainer'

const Home = () => {
  return (
    <div className='py-8 w-full min-h-screen'>

      <div className='px-4 lg:px-8'>
      <h1 className='text-2xl md:text-4xl  uppercase font-bold text-purple-800 first-letter:text-purple-950 first-letter:text-6xl lg:firstfirst-letter:text-8xl'>Welcome to my blog site</h1>

      <h2 className='text-1xl capitalize font-semibold text-zinc-800 first-letter:text-black first-letter:text-2xl my-2'>where you can read blogs related to    
      <span className='uppercase mx-2 text-purple-950 font-extrabold text-2xl'>
      tech
      </span> and as well as blogs related to <span 
      className='uppercase text-purple-950 font-extrabold text-2xl'
      >movies</span> and <span
      className='uppercase text-purple-950 font-extrabold text-2xl'
      >anime</span> too...</h2>
      <h2 className='capitalize my-2'>and <span className='uppercase text-purple-950 font-extrabold text-2xl'>create</span> the blogs to share information and interest too...</h2>

        <h2 className='text-center underline text-1xl capitalize  mb-8'>view all blogs here <span className='text-2xl font-extrabold'>↓</span></h2>
        
        <div className='flex flex-wrap gap-8'>
          <BlogContainer />
        </div>

      </div>
    </div>
  )
}

export default Home