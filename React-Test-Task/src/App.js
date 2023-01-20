import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import './App.css';
import CardsView from './component/CardView';
import Listview from './component/ListView';
import listSVG from '../src/assets/images/list.png'
import gridSVG from '../src/assets/images/menu.png'

function App() {

  const [fishData, setFishData] = useState([])
  const [removeData, setRemoveData] = useState([])
  const [view, setView] = useState(false)

  const fetchData = () => {
    try {
      axios.get(process.env.REACT_APP_BASE_API).then((res) => {
        const removedFish = JSON.parse(localStorage.getItem("fishData"))
        let finalizeData = res.data
        if (removedFish?.length) {
          finalizeData = res.data.filter(item => !removedFish.includes(item["Scientific Name"]))
          setRemoveData(removedFish)
        }
        setFishData(finalizeData)
      }).catch((error) => {
        console.log("Error", error);
      });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onRemoveData = useCallback((name) => {
    const filterData = fishData.filter((item) =>
      item["Scientific Name"] !== name
    )
    setFishData(filterData)
    localStorage.setItem("fishData", JSON.stringify([...removeData, name]))
    setRemoveData((prev) => [...prev, name])
  }, [fishData, removeData])

  return (
    <div className="">
      <div className='main-box-wrap my-6'>
        <h4 className='text-4xl font-medium flex justify-center items-center text-[#159dbfc4] py-4'>Fishery Management</h4>
        <div className='flex justify-end items-end gap-2 px-12 '>
          <div className='bg-[#159dbfc4] items-center text-white px-6 font-medium py-2 rounded-3xl cursor-pointer shadow-lg  flex gap-2' onClick={() => setView(!view)} >
            <img className='w-[22px] h-[22px]' src={view ? listSVG : gridSVG} alt="view-icon" />
            <h5 >
              {view ? "List" : "Grid"}</h5>
          </div>
        </div>
        <div className='px-12 py-4'>
          {view ?
            <CardsView fishData={fishData} onRemoveData={onRemoveData} />

            : <Listview fishData={fishData} onRemoveData={onRemoveData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
