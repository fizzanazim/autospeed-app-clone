'use client'

import Image from "next/image";
import Navbar from "./components/navbar";
import Herosection from "./components/herosection";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { TiShoppingCart } from "react-icons/ti";
import { VscSettings } from "react-icons/vsc";
import Link from "next/link";
import { CiStar } from "react-icons/ci";
import Stars from "./components/stars";
import Sidebar from "./components/Sidebar";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AddtoCart, HideViewProduct, SetSidebarDisplay, ShowSideBar, ShowViewProduct } from "./Redux/Actions";
import ProductDisplay from "./components/productdisplay";
import Footer from "./components/footer";

export default function Home() {
  
  const [categories, setcategories]: any = useState([])
  const [products, setproducts]: any = useState(null)
  const [filteredproducts, setFilteredproducts]: any = useState(null)
  
  const dispatch = useDispatch()
  const router = useRouter()
  
  const [overlaydisplay, setOverlaydisplay]: any = useState('hidden')
  const [sidebardisplay, setSidebardisplay]: any = useState('hidden')
  const [screendisplay, setscreendisplay] = useState('overflow-scroll')
  const {viewproductdisplay} = useSelector((state:any)=>state.addtocartreducer)

  const [obj, setobj] = useState({})

  const [token, settoken]:any = useState('') 

  useEffect(()=>{

      if(typeof window!= "undefined"){

        settoken(localStorage.getItem('token') || '')

      }

  }, [])

  useEffect(() => {

    getcategories()

  }, [])

  const getcategories = async () => {

    var res = await axios.get('http://localhost:2005/api/port1')
    setcategories(res.data.categories)

    var res = await axios.get('http://localhost:2005/api/products-array')
    setproducts(res.data.products)
    setFilteredproducts(res.data.products)

  }

  const handleaddtocart = (e: any) => {

    if (token) {

      setSidebardisplay('block')
      setOverlaydisplay('block')
      dispatch(AddtoCart({...e, buyerqty: 0}, 1))
      setscreendisplay('overflow-hidden')

    }
    else {

      router.push('/sign-in')

    }

  }

  const handleoverlay = () => {

    setSidebardisplay('hidden')
    dispatch(HideViewProduct())
    setOverlaydisplay('hidden')
    setscreendisplay('overflow-scroll')

  }

  const handleviewproduct = (e:any) => {

    setOverlaydisplay('block')
    dispatch(ShowViewProduct())
    setobj(e)
    setscreendisplay('overflow-hidden')

  }

  const categoryproducts = (categoryname: any) => {

    if (products.length != 0) {

      setFilteredproducts(products.filter((e: any, i: any) => {

        return e.category == categoryname

      }))

    }

  }

  const allcategoryproducts = ()=>{

    setFilteredproducts(products)

  }

  console.log(filteredproducts);

  return (
    <div className={`max-h-screen ${screendisplay}`}>
      <Navbar />
      <Herosection />

      {/* OVERLAYDISPLAY */}
      <div onClick={handleoverlay} className={`${overlaydisplay} z-20 w-full h-screen bg-[rgba(100,100,100,0.4)] absolute top-0 left-0`}></div>
      
      {/* SIDEBAR */}
      <div className={`${sidebardisplay} w-[30%] z-30 h-screen absolute top-0 right-0`}>
        <Sidebar />
      </div>

      {/* VIEW PRODUCT */}
      <div className={`${viewproductdisplay} absolute top-1/2 left-1/2 z-20 -translate-1/2 w-[60%] py-8 px-8 bg-white`}>
        <ProductDisplay obj ={obj}/>
      </div>

      <div className="px-20 min-h-60 mt-10">
        <h2 className="text-center text-5xl">I OUR <span className="text-red-500">CATEGORY</span></h2>
        <h2 className="text-center text-3xl">The Best Categories of Autoparts</h2>

        <div className="w-full mt-10 overflow-hidden">
          <div className="flex w-[200%] items-center gap-7">
            {
              categories.length != 0 && categories.map((e: any, i: any) => {

                return (

                  <div className="flex flex-col items-center justify-center gap-4 \ cursor-pointer">
                    <img className="h-40 w-40 rounded-full border" src={e.catimg} alt="" />
                    <h2 className="text-lg font-semibold capitalize">{e.catname}</h2>
                    <p>
                      {/* {
                        
                      } */}
                    </p>
                    
                  </div>

                )

              })

            }
          </div>
        </div>
      </div>

      <div className="px-20 min-h-60 py-3 mt-10">
        <h2 className="text-center text-5xl uppercase">I categories  <span className="text-red-500">product</span></h2>
        <h2 className="text-center text-3xl mt-3">The Best Categories of Autoparts</h2>
        <div className="mt-5">
          <ul className="flex w-full items-center justify-center gap-4">

            <li><button onClick={allcategoryproducts} className="border px-4 py-2 cursor-pointer rounded border-gray-300 text-gray-700 capitalize">ALL</button></li>
            {categories.map((e: any, i: any) => (

              <li><button onClick={() => { categoryproducts(e.catname) }} className="border px-4 py-2 cursor-pointer rounded border-gray-300 text-gray-700 capitalize">{e.catname}</button></li>

            ))}
          </ul>
        </div>
        <div className="mt-10">
          <div className="flex">
            {
              filteredproducts && filteredproducts.map((e: any, i: any) => {

                return (

                  <div className="w-60 min-h-70 group relative flex flex-col items-center justify-center gap-1 cursor-pointer">
                    <Link href={`/single-product/${e._id}`}>
                      <img className="h-57 w-52 rounded border-gray-400 border" src={e.proimg} alt="" />
                      <h2 className="text-red-500 text-xl font-semibold">${e.proprice}</h2>
                      {/* <h2 className="font-semibold">{e.proname.split(' ').slice(0, 3).join(' ')}...</h2> */}
                      <h2>Rating: {Number(e.prorating).toFixed(2)}</h2>
                    </Link>
                    <div onClick={()=>handleviewproduct(e)} className="w-10 h-10 text-xl hidden group-hover:flex cursor-pointer absolute top-[40%] left-1/2 -translate-1/2 items-center justify-center bg-black text-white rounded hover:bg-red-500 transition-all duration-300"><IoEyeOutline /></div>
                    <div className="flex gap-1 hidden group-hover:flex items-center absolute bottom-1">
                      <div className="w-10 flex items-center justify-center rounded text-white bg-black h-10 text-2xl hover:bg-red-500 transition-all duration-2000"><CiHeart /></div>
                      <div onClick={()=>handleaddtocart(e)} className="flex h-10 px-3 rounded text-white bg-black items-center gap-1 hover:bg-red-500 transition-all duration-300"><TiShoppingCart className="text-2xl" />Add to Cart</div>
                      <div className="w-10 flex items-center justify-center rounded text-white bg-black h-10 text-2xl hover:bg-red-500 transition-all duration-300"><VscSettings /></div>
                    </div>
                  </div>

                )

              })
            }
          </div>
        </div>
      </div>

      <div className="mt-15">
        <Footer/>
      </div>
      
    </div>
  );
}
