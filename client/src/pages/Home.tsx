import React from 'react'
import { 
  Slider,
  Collections,
  Products,
} from '../components';

export default function Home () {
  return (
    <div className='h-full'>
      <Slider />
      <Collections />
      <div className='my-2'>
        <h3 className='capitalize font-semibold text-xl font-mono my-3 text-center'> featured products </h3>
        <Products />
      </div>
    </div>
  )
}
