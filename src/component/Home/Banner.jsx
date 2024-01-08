import React, { useState } from 'react'
import Slider from 'react-slick'
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
  bannerImgFour,
  bannerImgFive,
} from '../../assets'

const Banner = () => {
  const [dataActive, setDocActive] = useState(0)
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next)
    },
    appendDots: (dots) => (
      <div
        style={{
          position: 'absolute',
          top: '70%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '210px',
        }}
      >
        <ul
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {' '}
          {dots}{' '}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dataActive
            ? {
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                background: '#131921',
                boxShadow: '2px 2px 2px gray',
                padding: '8px 0',
                cursor: 'pointer',
                border: '2px #f3a847 solid',
              }
            : {
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#232F3E',
                color: 'white',
                padding: '8px 0',
                cursor: 'pointer',
                border: '1px solid white',
              }
        }
      >
        {i + 1}
      </div>
    ),
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  }
  return (
    <div className=' w-ful'>
      <div className='relative w-full h-full '>
        <Slider {...settings}>
          <div>
            <img src={bannerImgOne} alt='' />
          </div>
          <div>
            <img src={bannerImgTwo} alt='' />
          </div>
          <div>
            <img src={bannerImgThree} alt='' />
          </div>
          <div>
            <img src={bannerImgFour} alt='' />
          </div>
          <div>
            <img src={bannerImgOne} alt='' />
          </div>
          <div>
            <img src={bannerImgFive} alt='' />
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default Banner
