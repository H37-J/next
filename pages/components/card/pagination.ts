const getPages = (length: number, inc: number = 1) => {
    return Array.from({length}, (_, i) => i + inc)
}

const usePagination = (totalItems: number, currentPage: number, itemsPerPage: number) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    return [...getPages(totalPages)]
}