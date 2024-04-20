"use client"

import { FileDown,ChevronLast,ChevronFirst,Filter,X } from 'lucide-react'
import React,{useState} from 'react'
import { tableData } from '@/data';

const Modal = ({}) => {
    const[itemsPerPage,setItemsPerPage]=useState(4)
    const [currentPage, setCurrentPage] = useState(1);
const [data, setData]=useState(tableData)

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const totalPagesToShow = Math.min(totalPages, currentPage + 2);
  
    for (let i = currentPage; i <= totalPagesToShow; i++) {
      buttons.push(
        <button
          key={i}
          className='px-3 mx-1 md:mx-2 text-center rounded-md border  '
          style={{ 
            backgroundColor: i === currentPage ? 'red' : 'white',
            color: i=== currentPage?"white":"gray"
        
        }}
          onClick={() => handleChangePage(i)}
        >
          {i}
        </button>
      );
    }
  
    return buttons;
  };
  
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleDropdown=(e)=>{
      console.log(e.target.value)
      setItemsPerPage(e.target.value)

    }
  return (
    <div class="flex flex-col text-white rounded-lg shadow-xl w-11/12 md:w-3/5 lg:max-w-xl h-1/2 py-2">
      <div className='flex items-center justify-between text-center'>
        <div className='w-28'/>
        <h1 className=' text-black font-bold text-md md:text-lg py-2 text-center'>Recently Generated reports</h1>
        <div className='text-black flex justify-end space-x-2 mx-4'>
        <Filter className='border-2 border-black rounded-lg p-1 w-8 h-8 cursor-pointer' />
        <X className='border-2 border-black rounded-lg p-1 w-8 h-8 cursor-pointer' />
        </div>
      </div>
    <div class="overflow-x-auto h-full">
      <div class=" min-w-full  align-center flex flex-col justify-between h-full">
        <div>
          <table class="min-w-full table-auto">
            <thead>
              <tr className='bg-gray-100 w-full'>
                <th scope="col" class="columns px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Date</th>
            
                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Report Name</th>
                <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Download</th>
              </tr>
            </thead>
            <tbody>
            {paginatedData.map((item, index) => {
                return(
                    <tr key={index}>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 flex flex-col justify-center">{item.date}<span className='text-xs text-gray-400'>{item.time}</span></td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-black">{item.city}</td>
                <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                  <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"><FileDown /></button>
                </td>
                </tr>
                )
            })}
            </tbody>
          </table>
        </div>
        <div className='flex justify-evenly border-t pt-2 w-full'>
        <div className='flex items-center justify-center'>

<button className='text-gray-500 flex text-sm md:text-md items-center' onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1}>
 <ChevronFirst />Prev 
</button>
<div className='flex items-center justify-center'>
{renderPaginationButtons()}
</div>

<button className='text-gray-500 flex items-center text-sm md:text-md' onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === totalPages}>
Next <ChevronLast />
</button>
</div>
<div className='flex items-center'>
  <p className='text-xs px-2 text-gray-500'>Rows per page</p>
  <select value={itemsPerPage} onChange={handleDropdown}className='text-gray-500 text-md rounded-lg text-center border border-gray-500'>
    {tableData.map((item,index)=>{
      return(
        <option value={item.id}>{item.id}</option>
      )
    })}
  
</select>

</div>

        </div>
      

      </div>
    </div>
  </div>
  )
}

export default Modal