import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

const Widget = () => {
  return (
    <div className="col-span-2 mt-2 hidden px-2 lg:inline">
      {/* Search */}
      <div className="mt-2 flex items-center space-x-2 rounded-full bg-gray-100 p-3">
        <HiOutlineSearch className="h-5 w-5 flex-shrink-0 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Twitter"
        />
      </div>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="S_herdeybayor"
        options={{ height: 400 }}
      />
    </div>
  )
}

export default Widget
