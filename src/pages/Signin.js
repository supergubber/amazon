import React, { useState } from 'react'
import { darkImage } from '../assets'
import { ArrowRight } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../Redux/splice/amazonSlice'
// import { motion } from 'framer-motion'
const Signin = () => {
  const dispatch = useDispatch()
  const auth = getAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //error state
  const [errEmail, setErrEmail] = useState('')
  const [errPassword, setErrPassword] = useState('')

  //firebase state error
  const [userEmailErr, setUserEmailErr] = useState('')
  const [usePassErr, setUserPassErr] = useState('')
  //loading state
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const handleEmail = (e) => {
    setEmail(e.target.value)
    setErrEmail('')
    setUserEmailErr('')
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
    setErrPassword('')
    setUserPassErr('')
  }

  const handleSignin = (e) => {
    e.preventDefault()
    if (!email) {
      setErrEmail('! Enter a email id')
      setUserEmailErr('')
    }
    if (!password) {
      setErrPassword('! Enter a password')
      setUserPassErr('')
    }

    if (email && password) {
      setLoading(true)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          dispatch(
            setUserInfo({
              _id: user.uid,
              userName: user.displayName,
              email: user.email,
              image: user.photoURL,
            })
          )
          // console.log(user)
          // ...
          setLoading(false)
          setSuccessMsg('Logged in Successfully! Welcome you back!')

          setTimeout(() => {
            navigate('/')
          }, 2000)
        })
        .catch((error) => {
          setLoading(false)
          const errorCode = error.code
          // console.log(errorCode)
          // const errorMessage = error.message
          if (errorCode.includes('auth/invalid-email')) {
            setUserEmailErr('Invalid Email')
          }
          if (errorCode.includes('auth/invalid-credential')) {
            setUserPassErr('Wrong password! try again')
          }
          // console.log('Something is up try with correct Credential !')
        })
      setEmail('')
      setPassword('')
      setUserEmailErr('')
      setUserPassErr('')
    }
  }
  return (
    <div className='w-full min-h-screen pt-10 bg-white'>
      <div className='w-full pb-10'>
        {successMsg ? (
          <div className='flex items-center justify-center w-full py-32'>
            <p className='border-[1px] border-green-600 text-green-500 font-titleFont text-lg font-semibold px-6 py-2'>
              {successMsg}
            </p>
          </div>
        ) : (
          <form
            className='w-[350px] mx-auto flex flex-col items-center'
            onSubmit={handleSignin}
          >
            <Link to={'/'}>
              <img src={darkImage} alt='darklogo' className='w-32 mb-3' />
            </Link>
            <div className='w-full p-6 border border-zinc-200'>
              <h2 className='mb-4 text-3xl font-medium font-titleFont'>
                Sign in
              </h2>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>
                    Email or mobile phone number
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    type='text'
                    className='w-full px-2 py-1 text-base lowercase border rounded-sm outline-none border-zinc-400 focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-400 '
                  />
                  {errEmail && (
                    <p className='flex items-center gap-2 text-xs font-semibold tracking-wide text-red-600 -mt-1.5 italic font-serif'>
                      {errEmail}
                    </p>
                  )}
                  {userEmailErr && (
                    <p className='flex items-center gap-2 text-xs font-semibold tracking-wide text-red-600 -mt-1.5 italic font-serif'>
                      {userEmailErr}
                    </p>
                  )}
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-medium'>Password</p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    type='Password'
                    className='w-full px-2 py-1 text-base lowercase border rounded-sm outline-none border-zinc-400 focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-400 '
                  />
                  {errPassword && (
                    <p className='flex items-center gap-2 text-xs font-semibold tracking-wide text-red-600 -mt-1.5 italic font-serif'>
                      {errPassword}
                    </p>
                  )}
                  {usePassErr && (
                    <p className='flex items-center gap-2 text-xs font-semibold tracking-wide text-red-600 -mt-1.5 italic font-serif'>
                      {usePassErr}
                    </p>
                  )}
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
                </div>
              </div>
              <p className='mt-4 text-xs leading-4 text-black '>
                By Continuing, you agree to Amazon's{' '}
                <span className='text-blue-600'>Conditions of Use</span> and
                <span className='text-blue-600'> Privace Notice</span>
              </p>
              <p className='mt-4 text-xs text-gray-600 cursor-pointer group'>
                <ArrowRight />{' '}
                <span className='text-blue-600 group-hover:underline underline-offset-1 group-hover:text-orange-700'>
                  Need help ?
                </span>
              </p>
            </div>
            <p className='flex items-center w-full mt-4 text-xs text-gray-600'>
              <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
              <span className='w-1/3 text-center'>New to Amazon?</span>
              <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
            </p>
            <Link to='/registration' className='w-full'>
              <button
                //   component={Link}
                //   to='/registration'
                //   onClick={(e) => e.preventDefault()}
                className='w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'
              >
                Create your Amazon Account
              </button>
            </Link>
          </form>
        )}
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

export default Signin
