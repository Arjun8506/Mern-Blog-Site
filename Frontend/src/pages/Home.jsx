import React from 'react'
import BlogContainer from '../components/BlogContainer'

const Home = () => {
  return (
    <div className='py-8 w-full min-h-screen'>

      <div className='px-4 lg:px-8'>
      <h1 className='text-2xl md:text-4xl  uppercase font-bold'>Welcome to my blog site</h1>

      <h2 className='text-1xl capitalize font-semibold text-zinc-800 my-2'>where you can read blogs related to    
      <span className='uppercase mx-2 font-bold'>
      tech
      </span> and as well as blogs related to <span 
      className='uppercase  font-bold'
      >movies</span> and <span
      className='uppercase  font-bold '
      >anime</span> too...</h2>
      <h2 className='capitalize my-2'>and <span className='uppercase  font-bold '>create</span> the blogs to share information and interest too...</h2>

        <h2 className='text-center underline text-1xl capitalize  mb-8'>view all blogs here <span className='text-2xl font-bold'>↓</span></h2>
        
        <div className='flex flex-wrap gap-8'>
          <BlogContainer />
        </div>

      </div>
    </div>
  )
}

export default Home