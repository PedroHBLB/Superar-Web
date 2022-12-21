import React, { useEffect, useState } from "react";
import { Search } from "../../components/Search";
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
      <div>
        {!!searchValue && (
          <h1>Pesquisa: {searchValue}</h1>
        )}
        <Search searchValue={searchValue} handleChange={handleChange} />
      </div>
      {filteredData.length > 0 && (
        <div>
          <table className="tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Setor</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((post: any) => {
                return <tr key={post.id}>
                  <td>{post.nome}</td>
                  <td>{post.email}</td>
                  <td>{post.setor}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      )}
      {filteredData.length === 0 && (
        <h2>No Data</h2>
      )}
    </div>

  );
}