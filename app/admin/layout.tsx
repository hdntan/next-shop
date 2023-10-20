import SideBar from "../SideBar"

export default function layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className='w-full flex flex-col'>
      <div className='flex flex-row h-[1000px] '>
      <SideBar />
      {children}
      </div>
               
                
        </section>
  }