import Image from 'next/image'
import {options} from './api/auth/[...nextauth]/options'
import {getServerSession} from "next-auth/next"
import ProductList from './components/ProductList';


export default async function Home() {
  const session = await getServerSession(options);
  return (
    <div>
      <ProductList/>
    </div>
  )
}
  