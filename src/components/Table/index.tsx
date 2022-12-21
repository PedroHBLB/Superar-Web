import React from 'react';

import { Container } from './styles';

export function Table({filteredData}: any) {
    return (
        <Container>
            <table>
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
            </table >
        </Container>
    );
}