import type { PropsWithChildren } from 'react'
import { Announcement, Footer, NavBar, OurNewsletter } from '../components'

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
        <Announcement />
        <NavBar />
        { children }
        <OurNewsletter />
        <Footer />
    </>
  )
}

export default RootLayout;