
export function getPaginationSettings(currentPage: number, handleOnChange: (page:number) => void, totalPages:number){
    return {current: currentPage, onChange: handleOnChange, defaultPageSize:20, total: totalPages, showSizeChanger:false}
}