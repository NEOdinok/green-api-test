import Image from 'next/image'
import LoginCard from '@/components/loginCard/LoginCard'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow w-full max-w-xl overflow-hidden">
      <LoginCard />
    </main>
  )
}
