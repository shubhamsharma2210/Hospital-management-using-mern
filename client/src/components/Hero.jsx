import React from 'react'

const Hero = ({title, image_url}) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>A hospital management system efficiently oversees hospital operations, including patient records, appointments, staff scheduling, billing, and inventory. It integrates various departments such as admissions, labs, and pharmacies, ensuring smooth workflows and timely care. This system improves communication, reduces errors, enhances patient care, and streamlines administrative tasks for better overall efficiency.</p>
        </div>
        <div className="banner">
          <img src={image_url} alt={"image"} className='animated-image ' />
       <span>
       <img src="/Vector.png" alt="" />
       </span>
        </div>

      </div>
    </>
  )
}

export default Hero