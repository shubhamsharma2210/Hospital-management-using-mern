import React from 'react'

const Biography = ({image_url}) => {
  return (
    <div className='container biography'>
        <div className='banner'>
        <img src={image_url} alt="" />
        </div>
        <div className="banner">
            <p>Biography</p>
            <h3>Who are you ?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, iste! Cupiditate earum aut quae deserunt consequuntur porro aliquid illum, maiores ducimus molestiae dolore quo officia perspiciatis totam? Beatae, dolore amet culpa necessitatibus corporis sint asperiores voluptate deleniti tempora laborum inventore consequuntur accusantium iste possimus? Corporis, ducimus voluptatibus. Et, sunt perferendis!</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique debitis totam accusantium, quibusdam culpa suscipit quam iste iure. Officiis quas architecto omnis doloremque beatae, unde ex, voluptate adipisci laborum officia ad odio qui maiores amet?</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, eum.</p>
        </div>
    </div>
  )
}

export default Biography