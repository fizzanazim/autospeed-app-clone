'use client'

import { SetSidebarDisplay } from "./Actions"

const initialState = {

    cartarray: [],
    sidebardisplay: 'hidden',
    viewproductdisplay: 'hidden'

}

const AddtoCartReducer = (state:any = initialState, action: any)=>{

    switch(action.type){

        case 'addtocart':
            var exisiting_product = state.cartarray.find((e:any,i:any)=>{

                return e.proname == action.product.proname

            })            

            if(exisiting_product){

                return({...state, cartarray: state.cartarray.map((e:any,i:any)=>{
                    
                    if(e.proname == exisiting_product.proname){

                        return {...e, buyerqty: e.buyerqty + action.counter}

                    }
                    else{

                        return e

                    }

                })})

            }
            else{

                return({...state, cartarray: [...state.cartarray, {...action.product, buyerqty: action.product.buyerqty + action.counter}]})

            }

            case 'increqty':

                return({...state, cartarray: state.cartarray.map((e:any, i:any)=>{

                    return i == action.index? {...e, buyerqty: e.buyerqty +1} : e


                })})

            case 'decreqty':
                return({...state, cartarray: state.cartarray.map((e:any, i:any)=>{

                    return i==action.index? {...e, buyerqty: e.buyerqty -1} : e

                })})

            case 'removeqty':
                return({...state, cartarray: state.cartarray.filter((e:any,i:any)=>{

                    return action.index != i

                })})

            case 'setsidebardisplay':
                return({...state, sidebardisplay: 'hidden'})
        
            case 'showsidebar':
                return({...state, sidebardisplay: 'block'})

            case 'showviewproduct':
                return({...state, viewproductdisplay: 'block'})
        
            case 'hideviewproduct':
                return({...state, viewproductdisplay: 'hidden'})
        
        default:
            return state

    }

}

export default AddtoCartReducer