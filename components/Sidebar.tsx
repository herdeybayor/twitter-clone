import Image from 'next/image'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

import SidebarRow from './SidebarRow'
import {
  HiOutlineBell,
  HiOutlineHashtag,
  HiOutlineBookmark,
  HiOutlineCollection,
  HiOutlineDotsCircleHorizontal,
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineHome,
} from 'react-icons/hi'

const Sidebar = () => {
  const { data: session } = useSession()
  return (
    <div className="col-span-2 flex flex-col items-center md:items-start">
      <div className="relative m-3 h-10 w-10">
        <Image src="https://links.papareact.com/drq" layout="fill" alt="logo" />
      </div>

      <SidebarRow title="Home" Icon={HiOutlineHome} />
      <SidebarRow title="Explore" Icon={HiOutlineHashtag} />
      <SidebarRow title="Notifications" Icon={HiOutlineBell} />
      <SidebarRow title="Messages" Icon={HiOutlineMail} />
      <SidebarRow title="Bookmarks" Icon={HiOutlineBookmark} />
      <SidebarRow title="Lists" Icon={HiOutlineCollection} />
      {!session ? (
        <SidebarRow
          onClick={() => signIn()}
          title="Sign In"
          Icon={HiOutlineUser}
        />
      ) : (
        <SidebarRow
          onClick={() => signOut()}
          title="Sign Out"
          Icon={HiOutlineUser}
        />
      )}
      <SidebarRow title="More" Icon={HiOutlineDotsCircleHorizontal} />
    </div>
  )
}

export default Sidebar
