import React, { useEffect, useState } from "react";
import { Table, Button } from 'react-bootstrap';

export function ValidationTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  function deletar() {
    let url = "http://192.168.11.105:3000/colaborador/delete/"
    fetch(url, { method: 'DELETE' })
    .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }
  function datas() {
    let url = "http://192.168.11.105:3000/colaborador/screen/"
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    datas();
  }, []);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Setor</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((post: any) => {
            return <tr key={post.id}>
              <td>{post.nome}</td>
              <td>{post.email}</td>
              <td>{post.setor}</td>
              <td><Button variant='primary'>Atualizar</Button> <Button variant='danger' onClick={deletar}>Excluir</Button></td>
            </tr>
          })}
        </tbody>
      </Table>
    </div>

  );
}