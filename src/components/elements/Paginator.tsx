import React from 'react'
import ReactPaginate from 'react-paginate';

import { withContainer } from '../../context/ServcieProvder';
import prev from '../../assets/icons/prev.svg'
import next from '../../assets/icons/next.svg'
import { useContext, useState, useEffect} from 'react';
import {EventsContext} from '../../context/Events'
import { url } from '../../constants';
import { loadImages } from '../Details/helpers';

export const Paginator = withContainer(({container : { appData: { totalTx, totalWallets }}}) => {

const [page, setPage] = useState(0)
const [total, setCount] = useState(0)
console.log(page);
const ctx = useContext(EventsContext)

console.log(Math.ceil(total/50), 'ds');

const onClickPage = async (idx:number) => {
    //console.log(idx);
    const newPage = page + idx < 0 ? 0 : page + idx <= Math.ceil(total/50) ? page + idx : page;

    if (page !== newPage ) {
    ctx?.setIsLoading(true)
    const res = await fetch(`${url}?offset=${newPage}&chainName=${ctx?.chainName}`)
    const {events, count} = await res.json();

    ctx?.setEvents && await loadImages(events,  ctx.setEvents)
    ctx?.setIsLoading(false);

    setCount(count)
    setPage(newPage)
    }
}

useEffect(() => {
    setCount(totalTx)
}, [totalTx])

useEffect(() => {
    console.log('ds');
    setPage(0)
},[ ctx?.chainName])

return <div className="paginatorWraper">
        <button onClick={() => onClickPage(-page)}>First</button>
         <ReactPaginate
        breakLabel="..."
        nextLabel={<div className="paginationControlWraper" onClick={() => onClickPage(1)}><img src={next}/></div>}
        onPageChange={() => {}}
        pageRangeDisplayed={0}
        pageCount={Math.ceil(total/50)}
        breakClassName={'paginatorItem'}
        pageClassName="paginatorItem"
        previousLabel={<div className="paginationControlWraper" onClick={() => onClickPage(-1)}><img src={prev}/></div>}
        //renderOnZeroPageCount={''}
      />
       <button onClick={() => onClickPage(Math.ceil(total/50) - page - 1)}>Last</button>
</div>
})