import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
import Departments from '../components/Departments'
import MessageForm from '../components/MessageForm'

const Home = () => {
  return (
    <div>
      <Hero title={"Welcome to ShubhCare Medical Institute | Your trusted health Care Provider "} image_url ={"/hero.png"} />
      <Biography image_url={'/about.png'} />
      <Departments />
      <MessageForm />
    </div>
  )
}

export default Home