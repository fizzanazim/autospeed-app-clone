import React from 'react'

const Footer = () => {
  return (
    <div className='w-full bg-black text-white px-15 py-10 font-semibold flex justify-between'>
      <div className='flex flex-col gap-8 w-1/5'>
        <h2 className='uppercase'>about us</h2>
        <p className=''>Must explain too you all this mistaken idea off denouncing pleasure and well praising pain was born and I will gives you complete accounts systems must.</p>
      </div>
      <div className='flex flex-col gap-10 '>
        <h2 className='uppercase'>my account</h2>
        <ul className='flex flex-col gap-5 '>
          <li className='capitalize'>about us</li>
          <li className='capitalize'>delivery information</li>
          <li className='capitalize'>privacy policy</li>
          <li className='capitalize'>terms and conditions</li>
          <li className='capitalize'>newsletter</li>
        </ul>
      </div>
      <div className='flex flex-col gap-10 '>
        <h2 className='uppercase'>information</h2>
        <ul className='flex flex-col gap-5 '>
          <li className='capitalize'>May account</li>
          <li className='capitalize'>Order History</li>
          <li className='capitalize'>brands</li>
          <li className='capitalize'>wish list</li>
          <li className='capitalize'>pecials</li>
        </ul>
      </div>
      <div className='flex flex-col gap-10 '>
        <h2 className='uppercase'>customer service</h2>
        <ul className='flex flex-col gap-5 '>
          <li className='capitalize'>contact us</li>
          <li className='capitalize'>site map</li>
          <li className='capitalize'>gift certificates</li>
          <li className='capitalize'>affilate</li>
          <li className='capitalize'>returns</li>
        </ul>
      </div>
      <div className='flex flex-col gap-10 '>
        <h2 className='uppercase'>contact us</h2>
        <div className='flex flex-col gap-5 '>
          <p>Address: 1093 Marigold Lane</p>
          <p>Coral Way, surat</p>
          <p>Call: 610-403-403</p>
          <p>Email: company@example.com</p>
        </div>
      </div>
    </div>
  )
}

export default Footer