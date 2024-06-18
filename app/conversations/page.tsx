import { CornerUpLeft } from 'lucide-react'

export default function page() {

  return (
    <div className='w-full h-full flex items-center justify-center'>
        
        <h3 className='text-xl font-bold flex flex-col items-center'>
            <CornerUpLeft width={60} height={60}/>
            Selectionnez une conversation...
        </h3>

    </div>
  )
}
