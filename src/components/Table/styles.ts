import styled from 'styled-components';

export const Container = styled.div`
    table {
        width: 100%;
        border-collapse: collapse;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    
    th,
    td {
        padding: 15px;
        background-color: rgba(255,255,255,0.2);
        color: #fff;
    }
    
    th {
        text-align: left;
    }
    
    thead {
        th {
            background-color: rgba(98,134,49);
        }
    }
    
    tbody {
        tr {
            &:hover {
                background-color: rgba(255,255,255,0.3);
            }
        }
        td {
            cursor: pointer;
            position: relative;
            transition: all 0.25s ease-out;
            &:hover {
                &:before {
                    content: "";
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: -9999px;
                    bottom: -9999px;
                    z-index: -1;
                }
            }
        }
    }
`