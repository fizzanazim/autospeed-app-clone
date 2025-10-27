'use client'

const AddtoCart:any = (product: any, counter:any) => (dispatch:any) =>{

    dispatch({type: 'addtocart', product: product, counter: counter})

}

const Increqty:any = (index:any)=> (dispatch:any)=>{

    dispatch({type: 'increqty', index: index})

}

const Decreqty:any = (index:any)=> (dispatch:any)=>{

    dispatch({type: 'decreqty', index: index})

}

const RemoveItem:any = (index:any)=> (dispatch:any)=>{

    dispatch({type: 'removeqty', index: index})

}

const SetSidebarDisplay:any = ()=> (dispatch:any)=>{

    dispatch({type: 'setsidebardisplay'})

}

const ShowSideBar:any = ()=> (dispatch:any)=>{

    dispatch({type: 'showsidebar'})

}

const ShowViewProduct:any = ()=> (dispatch:any)=>{

    dispatch({type: 'showviewproduct'})

}

const HideViewProduct:any = ()=> (dispatch:any)=>{

    dispatch({type: 'hideviewproduct'})

}


export {AddtoCart, Increqty, Decreqty, RemoveItem, SetSidebarDisplay, 
    ShowSideBar, ShowViewProduct, HideViewProduct}