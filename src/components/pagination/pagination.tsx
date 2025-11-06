import { FC, useMemo } from "react";
import styles from './pagination.module.css';

type Props = {
    currentPage: number,
    total: number,
    countPerPage: number,
    onChangePage: (page: number) => void,
}

const showPageNumbers = 2 // number of pagenumbers before and after current pagenumber

export const Pagination: FC<Props> = ({currentPage, total, countPerPage, onChangePage}) => {

    const maxPage = useMemo(() => Math.floor(total / countPerPage), [total, countPerPage])

    const pages = useMemo(() => 
        { 
            const result = []
            const start = Math.max(1, currentPage - showPageNumbers)
            const end = Math.min(maxPage, currentPage + showPageNumbers)
            
        for (let p = start; p <= end; p++) {
            result.push(p)
        }
        return result
    }, [maxPage, currentPage]
    )

    const goTo = () => {
        let p = window.prompt('Go to page');
        if (Number(p) > 0) onChangePage(Number(p)-1)
    }

    return (
        <>
        { total > 0 ? 
        <div className={styles.pagination}>
            { currentPage > 1 ? <span title="Go to previous page" onClick={() => onChangePage(currentPage-1)} >&laquo;</span> : '' }
            { currentPage > showPageNumbers ? <span title="Go to first page" onClick={() => onChangePage(1)}>1</span> : '' }
            { currentPage > showPageNumbers+1 ? <span title="Go to page..." onClick={() => goTo()}>...</span> : '' }

            { pages.map((page) =>
                 <span key={'page-' + page} 
                    title={`Go to page ${page+1}`}
                    className={`${currentPage === page ? styles.active : ''}`}
                    onClick={() => onChangePage(page)}
                    >{page}</span> )
            }

            { currentPage < maxPage-(showPageNumbers+1) ? <span title="Go to page..." onClick={() => goTo()}>...</span> : '' }
            { currentPage < maxPage-showPageNumbers ? <span title="Go to last page" onClick={() => onChangePage(maxPage)}>{maxPage+1}</span> : '' }
            { currentPage < maxPage ? <span title="Go to next page" onClick={() => onChangePage(currentPage+1)}>&raquo;</span> : '' }
        </div> 
        : '' }
        </>
    )
}