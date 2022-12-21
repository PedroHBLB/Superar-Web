import React from 'react';

import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

export function Table({ filteredData }: any) {
    const { colaborador, ranking } = useAuth();

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Setor</th>
                        <th>Pontos</th>
                        <th>Posição</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((post: any) => {
                        return <tr key={post.id}>
                            <td><img style={{ width: 50 }} src={post.avatar} /></td>
                            <td>{post.nome}</td>
                            <td>{post.email}</td>
                            <td>{post.setor}</td>
                            <td>{ranking?.pontuacao_do_mes}</td>
                            <td>{ranking?.pos}</td>
                        </tr>
                    })}
                </tbody>
            </table >
        </Container>
    );
}