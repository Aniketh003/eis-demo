import './App.css'
import Table from './components/Table';
import Header from './components/Header';
import { useState } from 'react';
import StoreDetails from './components/StoreDetails';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  const [filter,setFilter] = useState("")
  const [date,setDate] = useState("")
  const [status,setStatus] = useState("")
  console.log(status)
  return (
    <div>
      <Routes>
        <Route path='/' element={[<Header setFilter={setFilter} setDateFilter={setDate} setStatusFilter={setStatus}/>,<Table status={status} filter={filter} date={date}/>]}/>
        <Route path='/store/:store_id' element={<StoreDetails/>}/>
      </Routes>
      {/* <Header setFilter={setFilter} setDateFilter={setDate} setStatusFilter={setStatus}/>
      <Table status={status} filter={filter} date={date}/> */}
    </div>
  );
};

export default App;
