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
      <Products />
    </div>
  )
}
