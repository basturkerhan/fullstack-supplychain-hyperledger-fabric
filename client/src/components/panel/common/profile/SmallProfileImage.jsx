import React from 'react'
import Image from 'react-bootstrap/Image'

const SmallProfileImage = ({src, alt}) => {
  return (
    <Image style={{
        width: '2.5rem',
        height: '2.5rem'
    }} roundedCircle={true} src={src} alt={alt} /> 
  )
}
export default SmallProfileImage;