import React, { useEffect, useState } from "react";
import { Search } from "../../components/Search";
import { Table } from '../../components/Table';
import './styles.css';

export function ValidationTable() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: any) => {
    const { value } = e.target;
    setSearchValue(value);
  }

  function datas() {
    let url = "http://192.168.11.84:3000/colaborador/screen/"
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => console.log(err))
  }

  const filteredData = !!searchValue
    ? data.filter((post: any) => {
      return post.nome.toLowerCase().includes(searchValue.toLowerCase())
        || post.email.toLowerCase().includes(searchValue.toLowerCase())
        || post.setor.toLowerCase().includes(searchValue.toLowerCase());
    }) :
    data

  useEffect(() => {
    datas();
  }, []);

  return (
    <div>
      <Search searchValue={searchValue} handleChange={handleChange} />
      {filteredData.length > 0 && (
        <Table filteredData={filteredData} />
      )}
      {filteredData.length === 0 && (
        <h2 style={{textAlign: 'center'}}>No Data</h2>
      )}
    </div>

  );
}