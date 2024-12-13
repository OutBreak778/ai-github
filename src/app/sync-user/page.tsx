import { db } from '@/server/db'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

const page = async () => {
  const {userId} = await auth()

  const client = await clerkClient()
  const user = await client.users.getUser(userId ?? "123")

  if(!user.primaryEmailAddress?.emailAddress) {
    toast("Email not found! Try again later.")
    throw new Error("Email not found")
  }
 

  await db.user.upsert({
    where: {
      emailAddress: user.primaryEmailAddress?.emailAddress,
    },
    update: {
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName
    },
    create: {
      id: userId ?? "123",
      emailAddress: user.primaryEmailAddress?.emailAddress,
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName
    }
  })

  return redirect('/dashboard')
 

}

export default page