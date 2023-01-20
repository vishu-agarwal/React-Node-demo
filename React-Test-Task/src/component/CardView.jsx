import React from "react";
import deleteSVG from '../assets/images/delete.svg'

const CardView = ({ fishData, onRemoveData }) => {
    return (
        <div className="card-main-wrap">
            {fishData.map((item, index) => (
                <div className=" border shadow-md rounded-2xl  hover:border-[#1997e75e]" key={index}>
                    <div className="flex justify-end items-center mt-4 mr-4">   <img className="w-6 text-red-700 cursor-pointer" onClick={() => onRemoveData(item["Scientific Name"])} src={deleteSVG} alt="delete-icon" /></div>
                    <div className="px-4">
                        <img className="w-full  h-64 object-contain" src={item["Species Illustration Photo"].src} alt={`fish-${item["Scientific Name"]}`} />
                    </div>
                    <div className="px-4 py-2">
                        <p className="text-md truncate font-normal text-gray-700 mt-2" data-bs-placement="top" data-bs-toggle="tooltip" title={item["Population"]} >{item["Population"]}</p>
                        <h4 className="text-lg font-semibold mt-2">{item["Scientific Name"]}</h4>
                        <h6 className="text-sm font-medium text-gray-700 mt-2 mb-6">{`${item["NOAA Fisheries Region"]}`.replace(/(<([^>]+)>)/ig, '')}</h6>
                    </div>
                </div>))}
        </div>
    )
}


export default CardView;
