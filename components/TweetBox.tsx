import Image from 'next/image'
import React, { useRef, useState } from 'react'
import {
  HiOutlineCalendar,
  HiOutlineEmojiHappy,
  HiOutlineLocationMarker,
  HiOutlinePhotograph,
  HiOutlineSearchCircle,
} from 'react-icons/hi'
import { useSession } from 'next-auth/react'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import { toast } from 'react-hot-toast'

interface Props {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
}

const TweetBox = ({ setTweets, setIsFetching }: Props) => {
  const { data: session } = useSession()
  const [input, setInput] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)
  const [imageUrlInvalid, setImageUrlInvalid] = useState<boolean>(false)
  const imageInputRef = useRef<HTMLInputElement>(null)

  function addImageToTweet(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    if (!imageInputRef.current?.value) return
    if (imageInputRef.current.value.slice(0, 8) !== 'https://') {
      setImageUrlInvalid(true)
    } else {
      setImage(imageInputRef.current.value)
      imageInputRef.current.value = ''
      setImageUrlInvalid(false)
      setImageUrlBoxIsOpen(false)
    }
  }

  async function postTweet() {
    const tweetBody: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
      image: image,
    }

    const result = await fetch(`api/addTweet`, {
      body: JSON.stringify(tweetBody),
      method: 'POST',
    })

    const json = await result.json()

    const newTweets = await fetchTweets()
    setTweets(newTweets)
    toast.success('Tweet Posted!')
    return json
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    setIsFetching(true)
    postTweet()
    setInput('')
    setImage('')
    setImageUrlBoxIsOpen(false)
    setIsFetching(false)
  }

  return (
    <div className="flex space-x-2 p-5">
      <div className="relative mt-4 h-14 w-14 flex-shrink-0">
        <Image
          src={session?.user?.image || 'https://links.papareact.com/gll'}
          layout="fill"
          objectFit="cover"
          alt="user img"
          className="rounded-full"
        />
      </div>

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            className="h-24 w-full text-sm outline-none placeholder:text-sm sm:text-xl sm:placeholder:text-xl"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="What's Happening?"
          />
          <div className="-ml-[72px] flex items-center sm:-ml-0">
            <div className="flex flex-1 space-x-2 text-twitter">
              <HiOutlinePhotograph
                onClick={() => {
                  setImageUrlBoxIsOpen((prev) => !prev)
                }}
                className="tweet__icon"
              />
              <HiOutlineSearchCircle className="tweet__icon" />
              <HiOutlineEmojiHappy className="tweet__icon" />
              <HiOutlineCalendar className="tweet__icon" />
              <HiOutlineLocationMarker className="tweet__icon" />
            </div>

            <button
              className="rounded-full bg-twitter px-5 py-2 font-bold text-white transition-transform duration-150 active:scale-125 disabled:cursor-not-allowed disabled:opacity-40 disabled:transition-none disabled:active:scale-100"
              onClick={handleSubmit}
              disabled={!input || !session}
            >
              Tweet
            </button>
          </div>
          {imageUrlBoxIsOpen && (
            <form className="mt-5 -ml-[72px] flex rounded-lg bg-twitter/80 py-2 px-2 sm:-ml-0 sm:px-4">
              <input
                className="w-44 flex-1 bg-transparent p-2 text-sm text-white placeholder-white outline-none sm:text-base"
                type="text"
                placeholder="Enter Image URL..."
                ref={imageInputRef}
              />
              <button
                onClick={addImageToTweet}
                type="submit"
                className="text-xs font-bold text-white sm:text-base"
              >
                Add Image
              </button>
            </form>
          )}
          {imageUrlInvalid && (
            <p className="-ml-[72px] mt-1 text-center text-sm text-red-500 sm:-ml-0">
              Enter a valid image url...
            </p>
          )}
          {!imageUrlInvalid && image && (
            <div className="-ml-[72px] mt-10 sm:-ml-0">
              <div className="relative aspect-auto h-44">
                <Image
                  src={`${
                    process.env.NEXT_PUBLIC_BASE_URL
                  }/api/imageproxy?url=${encodeURIComponent(image)}`}
                  alt="tweet image"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox
