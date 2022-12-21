export const Search = ({ searchValue, handleChange }: any) =>{
    return (
        <input
            className='text-input'
            onChange={handleChange}
            value={searchValue}
            type='search'
            placeholder='Search'
        />
    )
}