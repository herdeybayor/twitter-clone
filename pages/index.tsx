import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widget from '../components/Widget'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import { Toaster } from 'react-hot-toast'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'

interface Props {
  tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {
  return (
    <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
      <Head>
        <title>Twitter Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Toaster />
      </div>

      <main className="grid grid-cols-9">
        <Sidebar />

        <Feed tweets={tweets} />

        <Widget />
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const tweets = await fetchTweets()
  const session = await getSession(context)

  return {
    props: {
      tweets,
      session,
    },
  }
}
