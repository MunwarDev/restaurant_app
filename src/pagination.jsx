import { useState } from "react";


function Pagination({pages, page,records, length, previousPage, nextPage}) {

  const paginationArray = [];
  const fixedCards = Math.ceil(length/records);

  for(let i = 1; i <= fixedCards; i++){
    paginationArray.push(i);
  }
  

  const [active,setActive] = useState(1);
  const Changepage = (e) => {
    setActive(e);
    pages(e);
  }

  const handlePrevious = () => {
    if (active > 1) {
      setActive(active - 1);
      previousPage();
    }
  }

  const handleNext = () => {
    if (active < fixedCards) {
      setActive(active + 1);
      nextPage();
    }
  }

    return(
        <div>
            <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-end">
  <li className={`page-item ${active === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePrevious}>
              Previous
            </button>
          </li>
    {
      paginationArray.map(i => (
        <li className={`page-item ${active == i ? "active" : ""}`}><a class="page-link" onClick={() =>
          {Changepage(i)}
        }>{i}</a></li>
      ))
    }
    <li className={`page-item ${active === fixedCards ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handleNext}>
              Next
            </button>
          </li>
  </ul>
</nav>
        </div>
    )
}

export default Pagination;