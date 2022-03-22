import React from 'react'

export const SearchBar = ({search, setSearch}) => {


  return (
    <span>
        <input value={search || ''} onChange={e => setSearch(e.target.value)} placeholder="Search by Name"/>
    </span>
  )
}
