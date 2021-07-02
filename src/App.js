import React, { useEffect, useState, useCallback } from "react";
import Header from "./components/Header/Header";
import ListItem from "./components/ListItem/ListItem";
import Filter from "./components/Filter/Filter";
import axios from 'axios';
import lodash from 'lodash'

import './App.css';

function App() {
  const [data,setData]=useState([]);
  const [filteredData, setFilteredData]=useState([]);
  const [loading, setLoading]=useState(false);

  useEffect(()=>{
    setLoading(true);
    axios.get('https://okrcentral.github.io/sample-okrs/db.json').then(res=>{
    setLoading(false);
    if(res.data.data && res.data.data.length>0){
      const parentOkrs = res.data.data.filter(item => !item.parent_objective_id);
      parentOkrs.forEach(item=>{
        item.children=res.data.data.filter(child=>child.parent_objective_id&& child.parent_objective_id===item.id);
      });
      setData(parentOkrs);
      setFilteredData(parentOkrs);
      }
    }, err=>{
      setLoading(false);
      console.log("unable to get Data", err);
    })
  },[])

  const delayedFilter=useCallback(lodash.debounce((q)=>{filterData(q)},500),[data])

  const filterData=(value)=>{
    const filteredData=data.filter(item=>item.category.toLowerCase()===value.toLowerCase());
    setFilteredData(!value ? data : filteredData);
  }

  return (
    <div className="App">
    <Header></Header>
    <Filter setFilterData={delayedFilter}></Filter>
    {!loading && filteredData.length>0 && (
      <ol>
        {filteredData.map(item=>{
          return (
            <ListItem key={item.id} value={item.title} children={item.children}/>
          )
        })}
      </ol>
    )}
    {!loading && filteredData.length===0 && (
      <div className="empty-state">No data found</div>
    )}
    {loading && (
      <div className="loader">
      <svg className="svgLoader" viewBox="0 0 1024 1024" width="10em" height="10em">
      <path fill="#ccc"/>
    </svg>
    </div>
    )}
    </div>
  );
}

export default App;
