import React, { useState, useEffect } from 'react'
import { suppliers } from '../../utils/suppliers'
import Button from '../forms/Button'

const PaginationAlgo = () => {

    // pagination process
    const totalItems = suppliers.length
    const itemsPerPage = 5
    const numOfPages = Math.ceil(totalItems/itemsPerPage)
    const [currentPage, setCurrentPage] = useState(1)

    // slice data
    const [pages, setPages] = useState([])

    useEffect(() => {
        setPages(suppliers.slice(0, currentPage * itemsPerPage))
    }, [currentPage])

    const loadMoreData = () => {
        setCurrentPage(currentPage + 1)
    }

    return (
        <div className='h-full w-full p-20 flex flex-col'>
            <div>
                {
                    pages.map((supplier, index) => {
                        return <h1 key={index}>
                            {supplier}
                        </h1>
                    })
                }
            </div>
            <div>
                <Button btnText="Load More" classname="defaultBtn" handleClick={loadMoreData} />
            </div>
        </div>
    )
}

export default PaginationAlgo