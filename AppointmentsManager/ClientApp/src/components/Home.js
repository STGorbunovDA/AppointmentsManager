import { useEffect, useState } from "react";
import { Delete } from "./Delete"
import { Edit } from "./Edit"
import { New } from "./New"
import { getDefault, openModal, filter, notifyUser, getAppointments } from "./Lib";

import './components.css';
import { Appointment } from "./Appointment";

export function Home(props) {

  const [dataList, setDataList] = useState([])

  const [refreshData, setRefreshData] = useState(0)
  const [stateListener, setStateListener] = useState(0)
  
  const resetFiltersAndData = () => {
  // reset your filters
  filter.All = false;
  filter.Done = false;
  filter.Deleted = false;
  filter.StartDate = null;
  filter.EndDate = null;
  filter.SpecifiedDate = null;
  filter.SpecifiedTime = null;
  filter.LevelOfImportance = null;
  
  // increase the refreshData to trigger the useEffect to fetch data again.
  setRefreshData(prevState => prevState + 1);
};

  const filterApp = (e) => {
    debugger
    let { name, value } = e.target;

    if (name === "All" || name === "Done" || name === "Deleted") {
      value = e.target.checked;
      filter[name] = value
    }

    if (name === "period") {
      let sd_ = new Date(); 
      let ed_ = new Date();
    
      const dayNum = sd_.getDay();
    
      if (value === "1") {
        let startDaysInSec = (dayNum - 1) * 24 * 60 * 60 * 1000;
        let endDaysInSec = dayNum * 24 * 60 * 60 * 1000;
    
        sd_ = new Date(Date.now() - startDaysInSec);
        ed_ = new Date(Date.now() - endDaysInSec);
      }
    
      if (value === "2") {
        let startDaysInSec = (dayNum - 1) * 24 * 60 * 60 * 1000;
        let endDaysInSec = (7 - dayNum) * 24 * 60 * 60 * 1000;
    
        sd_ = new Date(Date.now() - startDaysInSec);
        ed_ = new Date(Date.now() - endDaysInSec);
      }
    
      if (value === 3) {
        let startDaysInSec = dayNum * 24 * 60 * 60 * 1000;
        let endDaysInSec = (6 + dayNum) * 24 * 60 * 60 * 1000;
    
        ed_ = new Date(Date.now() - startDaysInSec);
        sd_ = new Date(Date.now() - endDaysInSec);
      }
      
      // Remove AM/PM consideration by setting the time to midnight for all dates.
      if(value !== '4') {
        sd_.setHours(0);
        sd_.setMinutes(0);
        sd_.setSeconds(0);
        sd_.setMilliseconds(0);
    
        ed_.setHours(0);
        ed_.setMinutes(0);
        ed_.setSeconds(0);
        ed_.setMilliseconds(0);
      }
    
      filter.StartDate = value === '4' ? null : sd_;
      filter.EndDate = value === '4' ? null : ed_;
      filter.SpecifiedDate = null
    }
    if(name === "SpecifiedDate"){
      filter.SpecifiedDate = new Date(value);
      filter.StartDate = null
      filter.EndDate = null
    }
    if(name === "SpecifiedTime"){
      filter.SpecifiedTime = value;
    }
    
    if(name === "levelOfImportance"){
      
      filter.LevelOfImportance = Number(value) === 9 ? null : Number(value)
    }
    getAppointments(filter).then (r => {
      if(r.length < 1){
        notifyUser("Filter result is empty")
      }
      setDataList(r)
    }).catch(e => console.log("Error getting data on filter: ", e))
  }

  useEffect(() => {
    getDefault().then(data=>{
      setDataList(data)
    }).catch(e => console.log("Error inside home: ", e))
    
  }, [refreshData])

  return (
    <main>
      <h1>Manage Your Appointments / Dates very easy</h1>
      <p>This powerful web application helps you to manage your dates very easy.</p>
      <div className="add-btn rowbom items-center content-center">
        <div className="btn add" onClick={ () => openModal("new-modal")}>+</div>
      </div>

      <div className="notifications spacer-40"></div>

      <div className="parent-container">
        <section className="rowbom items-center filterBom">
          <div className="rowbom items-center filter-itemsBom">
            <button className="me-15 mt-15" onClick={ resetFiltersAndData }>Clear Filters</button>
            <div>
              <label className="ms-10" htmlFor="All_f">All</label> <br />
              <input type="checkbox" id="All_f" name="All" onChange={filterApp}/>
            </div>

            <div>
              <label htmlFor="Done_f">Done</label> <br />
              <input type="checkbox" id="Done_f" name="Done" onChange={filterApp}/>
            </div>

            <div>
              <label htmlFor="Deleted_f">Deleted</label> <br />
              <input type="checkbox" id="Deleted_f" name="Deleted" onChange={filterApp}/>
            </div>

            <div>
              <label htmlFor="period">Period</label> <br />
              <select name="period" id="period" defaultValue={"4"} onChange={filterApp}>
                <option value="5" disabled>Period</option>
                <option value="4" >Default</option>
                <option value="1" >Today</option>
                <option value="2" >This week</option>
                <option value="3" >Last week</option>
              </select>
            </div>

            <div>
              <label htmlFor="SpecifiedDate">Specified Date</label> <br />
              <input type="date" id="SpecifiedDate" name="SpecifiedDate" onChange={filterApp}/>
            </div>

            <div>
              <label htmlFor="SpecifiedTime">Specified Time</label> <br />
              <input type="time" id="SpecifiedTime" name="SpecifiedTime" onChange={filterApp}/>
            </div>

            <div>
              <label htmlFor="LevelOfImportance_f">Level Of Importance</label> <br />
              <select name="levelOfImportance" id="LevelOfImportance_f" defaultValue={8} onChange={filterApp}>
                <option value={8} disabled>Level Of Importance</option>
                <option value={9} >Reset</option>
                <option value={5} >Very High</option>
                <option value={4} >High</option>
                <option value={3} >Medium</option>
                <option value={2} >Normal</option>
                <option value={1} >Low</option>
                <option value={0} >Very Low</option>
              </select>
            </div>
          </div>
        </section>

      </div>

      <div className="rowbom underline hdr">
        <div className="column id">#</div>
        <div className="column title">Title</div>
        <div className="column description">Description</div>
        <div className="column importance">Importance</div>
        <div className="column date">Date</div>
        <div className="column time">Time</div>
        <div className="column adress">Adress</div>
        <div className="column edit">Edit</div>
        <div className="column delete">Delete</div>
      </div>

      {
        dataList.length === 0 ? <div className="rowbom mt-15 waiting">Loading <div className="loading">...</div> </div> :
          dataList.map(item => <Appointment item={item} key={item.id} stateListener = {setStateListener}/>)
      }
      <section>
        <section className="modal new-modal hidden">
          <New refreshApp={setRefreshData}/>
        </section>
        <section className="modal edit-modal hidden">
          <Edit refreshApp={setRefreshData} stateListener={stateListener}/>
        </section>
        <section className="modal delete-modal hidden">
          <Delete refreshApp={setRefreshData} stateListener={stateListener}/>
        </section>

      </section>

    </main>
  )

}