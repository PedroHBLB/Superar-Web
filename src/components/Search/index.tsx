import { Pesquisa } from "./styles"

export const Search = ({ searchValue, handleChange }: any) =>{
    return (
        <Pesquisa
            className='text-input'
            onChange={handleChange}
            value={searchValue}
            type='search'
            placeholder='Search'
        />
    )
}