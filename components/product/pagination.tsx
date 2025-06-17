import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';


const Pagination = ({ items, pageSize, currentPage, onPageChange }: any) => {
    const pagesCount = Math.ceil(items / pageSize);

    if (pagesCount === 1) return null;

    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

    return (
        <div className="w-full my-[50px]">
            <ul className="pagination w-full">
                <li className="w-[10%] flex justify-end">
                    <button
                        className="pageLink ml-[30px]"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} className="text-2xl pagination-button"/>
                    </button>
                </li>
                <div className="w-[80%] flex justify-center">
                    {pages.map((page) => (
                        <li
                            key={page}
                            className={page === currentPage ? "pageItemActive" : "pageItem"}
                        >
                            <button className="pageLink" onClick={() => onPageChange(page)}>
                                {page}
                            </button>
                        </li>
                    ))}
                </div>
                <li className="w-[10%]">
                    <button
                        className="pageLink ml-[30px]"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === pagesCount}
                    >
                        <FontAwesomeIcon icon={faAngleRight} className="text-2xl pagination-button"/>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
