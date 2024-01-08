import React, { useState } from 'react'
import { darkImage } from '../assets'
import { ArrowRight } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { RotatingLines } from 'react-loader-spinner'
const Registration = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  ///message state
  const [clientName, setClientName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  ///error message state
  const [errClientName, setErrClientName] = useState('')
  const [errEmail, setErrEmail] = useState('')
  const [errPassword, setErrPassword] = useState('')
  const [errCPassword, setErrCPassword] = useState('')
  const [firebaseErr, setFirebaseErr] = useState('')
  //loading state start
  const [loading, setLoading] = useState(false)
  const [successMes, setSuccessMes] = useState('')

  //behaviour message
  const handleName = (e) => {
    setClientName(e.target.value)
    setErrClientName('')
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
    setErrEmail('')
    setFirebaseErr('')
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
    setErrPassword('')
  }
  const handlecPassword = (e) => {
    setCPassword(e.target.value)
    setErrCPassword('')
  }
  //emailvalidation start
  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/)
  }
  ///submit button start
  const handleRegistration = (e) => {
    e.preventDefault()

    if (!clientName) {
      setErrClientName('! Enter your name')
    }
    if (!email) {
      setErrEmail('! Enter your email')
      setFirebaseErr('')
    } else {
      if (!emailValidation(email)) {
        setErrEmail('! email not valid')
      }
    }
    if (!password) {
      setErrPassword('! Enter your password')
    } else {
      if (password.length < 6) {
        setErrPassword('Password is must be at least 6 characters')
      }
    }
    if (!cPassword) {
      setErrCPassword('! Enter a re-enter password')
    } else {
      if (password.length !== cPassword.length) {
        setErrCPassword('password or confirm password not matched')
      }
    }
    if (
      clientName &&
      email &&
      emailValidation(email) &&
      password &&
      password.length >= 6 &&
      cPassword &&
      cPassword === password
    ) {
      setLoading(true)
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          updateProfile(auth.currentUser, {
            displayName: clientName,
            photoURL: 'https://mui.com/static/images/avatar/3.jpg',
          })
          const user = userCredential.user
          console.log(user)
          setLoading(false)
          setSuccessMes('Account created Successfully')
          setTimeout(() => {
            navigate('/signin')
          }, 3000)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code
          if (errorCode.includes('auth/email-already-in-use')) {
            setFirebaseErr('Email Already in use,Try another one')
          }
        })
      setClientName('')
      setEmail('')
      setPassword('')
      setCPassword('')
      setFirebaseErr('')
    }
  }
  return (
    <div className='w-full min-h-screen pt-10 bg-white'>
      <div className='w-full pb-10'>
        <form
          className='w-[350px] mx-auto flex flex-col items-center'
          onSubmit={handleRegistration}
        >
          <Link to={'/'}>
            <img src={darkImage} alt='darklogo' className='w-32 mb-3' />
          </Link>
          <div className='w-full p-4 border border-zinc-200'>
            <h2 className='mb-4 text-3xl font-medium font-titleFont'>
              Create Account
            </h2>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-2'>
                <p className='text-sm font-medium'>Your Name</p>
                <input
                  type='text'
                  value={clientName}
                  onChange={handleName}
                  className='w-full px-2 py-1 text-base lowercase border rounded-sm outline-none border-zinc-400 focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-400'
                />
                {errClientName && (
                  <p className='flex items-center gap-2 text-xs font-semibold tracking-wide text-red-600 -mt-1.5 italic font-serif'>
                    {errClientName}
                  </p>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm font-medium'>
                  Email or mobile phone number
                </p>
                <input
                  onChange={handleEmail}
                  type='text'
                  value={email}
                  className='w-full px-2 py-1 text-base lowercase border rounded-sm outline-none border-zinc-400 focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-400 '
                />
                {errEmail && (
                  <p className='flex items-center gap-2 text-xs font-semibold tracking-wide text-red-600 -mt-1.5 italic font-serif'>
                    {errEmail}
                  </p>
                )}
                {setFirebaseErr && (
                  <p className='flex items-center gap-2 text-xs font-semibold tracking-wide text-red-600 -mt-1.5 italic font-serif'>
                    {firebaseErr}
                  </p>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm font-medium'>Password</p>
                <input
                  onChange={handlePassword}
                  type='password'
                  value={password}
                  className='w-full px-2 py-1 text-base lowercase border rounded-sm outline-none border-zinc-400 focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-400 '
                />
                {errPassword && (
                  <p className='flex items-center gap-2 text-xs font-semibold tracking-wide text-red-600 -mt-1.5 italic font-serif'>
                    {errPassword}
                  </p>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm font-medium'>Re-Enter Password</p>
                <input
                  onChange={handlecPassword}
                  type='password'
                  value={cPassword}
                  className='w-full px-2 py-1 text-base lowercase border rounded-sm outline-none border-zinc-400 focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-400 '
                />
                {errCPassword && (
                  <p className='flex items-center gap-2 text-xs font-semibold tracking-wide text-red-600 -mt-1.5 italic font-serif'>
                    {errCPassword}
                  </p>
                )}
                <p className='text-xs text-gray-600'>
                  Password must be at least 6 characters
                </p>
              </div>
              <button
                type='submit'
                // onClick={(e) => e.preventDefault()}
                className='w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'
              >
                Continue
              </button>
              <div className='flex justify-center'>
                {loading && (
                  <RotatingLines
                    visible={true}
                    height='50'
                    width='50'
                    color='#febd69'
                    strokeColor='#febd69'
                    strokeWidth='5'
                    animationDuration='0.75'
                    ariaLabel='rotating-lines-loading'
                    wrapperStyle={{}}
                    wrapperClass=''
                  />
                )}
                {successMes && (
                  <div>
                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className='text-base font-semibold font-titleFont text-green-500 border-[1px] border-green-500 px-2 text-center'
                    >
                      {successMes}
                    </motion.p>
                  </div>
                )}
              </div>
            </div>
            <p className='mt-4 text-xs leading-4 text-black'>
              By creating an account, you agree to amazon's{' '}
              <span className='text-blue-600'> Conditions of Use</span> and
              <span className='text-blue-600'> Privace Notice</span>
            </p>
            <div>
              <p className='text-xs text-black'>
                Already have an account ?{' '}
                <span className='text-xs text-blue-600 duration-100 cursor-pointer hover:text-orange-600 hover:underline underline-offset-1'>
                  <Link to={'/signin'}>Sign In</Link>
                  <span>
                    <ArrowRight />
                  </span>
                </span>
              </p>
              <p className='-mt-2 text-xs text-black'>
                Buying for work?
                <span className='text-xs text-blue-600 duration-100 cursor-pointer hover:text-orange-600 hover:underline underline-offset-1'>
                  <span>Create a free business account</span>
                  <span>
                    <ArrowRight />
                  </span>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className='flex flex-col items-center justify-center w-full h-20 gap-4 py-10 bg-gradient-to-t from-white via-white to-zinc-200'>
        <div className='flex items-center gap-6'>
          <p className='text-xs text-blue-600 underline duration-100 cursor-pointer hover:text-orange-600 hover:underline-offset-1'>
            Conditions of Use
          </p>
          <p className='text-xs text-blue-600 underline duration-100 cursor-pointer hover:text-orange-600 hover:underline-offset-1'>
            Privacy Notice
          </p>
          <p className='text-xs text-blue-600 underline duration-100 cursor-pointer hover:text-orange-600 hover:underline-offset-1'>
            Help
          </p>
        </div>
        <p className='text-xs text-gray-600'>
          © 1996-2023, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  )
}

export default Registration
