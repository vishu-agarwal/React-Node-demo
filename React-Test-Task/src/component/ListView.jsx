import React from 'react'

const ListView = ({ fishData, onRemoveData }) => {
    return (
        <table className='w-full '>
            <thead className='bg-[#159dbfc4] text-center text-white   '>
                <tr>
                    <th className='w-[15%]  px-2 py-4 text-lg font-medium'>
                        Scientific Name
                    </th>
                    <th className='w-[15%]  px-2 py-4  text-lg font-medium'>
                        Species Name
                    </th>
                    <th className='w-[10%]  px-2 py-4 text-lg font-medium'>
                        Harvest Type </th>
                    <th className='w-[30%]  text-lg font-medium px-2 py-4'
                    >Population
                    </th>
                    <th className='w-[20%]  px-2 py-4 text-lg font-medium'>
                        NOAA Fisheries Region
                    </th>
                    <th className='w-[10%]  px-2 py-4 text-lg font-medium'>
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {fishData?.map((item, index) =>
                (<tr key={index}>
                    <td className='border-2 text-sm  p-2'> {item["Scientific Name"]} </td>
                    <td className='border-2 text-sm  p-2'>{item["Species Name"]}</td>
                    <td className='border-2 text-sm  p-2'>{`${item["Harvest Type"]}`.replace(/(<([^>]+)>)/ig, '')}</td>
                    <td className='border-2 text-sm p-2 '><h6>  {item["Population"]}</h6> </td>
                    <td className='border-2 text-sm  p-2'> {`${item["NOAA Fisheries Region"]}`.replace(/(<([^>]+)>)/ig, '')}</td>
                    <td className='border-2 text-sm  p-2'>
                        <div className='flex justify-center items-center'>
                            <button className='bg-[#00d3c0] hover:bg-[#0aa395] text-white font-bold py-2 px-4 rounded'
                                onClick={() => onRemoveData(item["Scientific Name"])} >Delete</button>
                        </div>
                    </td>
                    <td></td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ListView