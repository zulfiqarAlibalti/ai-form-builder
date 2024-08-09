"use client"
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AiChatSession } from '@/configs/AiModal'
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import moment from 'moment/moment'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { desc, eq } from 'drizzle-orm'

const PROMPT = ",On Basis of description create JSON form with formTitle, formHeading along with fieldName, FieldTitle,FieldType, Placeholder, label , required fields, and checkbox and select field type options will be in array only and in JSON format"

interface FormList {
  id: number
  jsonform: string
  createdBy: string
  createdAt: string
}

function CreateForm() {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [userInput, setUserInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [formList, setFormList] = useState<FormList[] | null>(null)
  const { user } = useUser()
  const route = useRouter()

  useEffect(() => {
    if (user) GetFormList()
  }, [user])

  const GetFormList = async () => {
    const result = await db.select().from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id))
    setFormList(result)
  }

  const onCreateForm = async () => {
    if (formList?.length === 3) {
      toast('Upgrade to create unlimited form')
      return
    }
    setLoading(true)
    const result = await AiChatSession.sendMessage("Description:" + userInput + PROMPT)
    console.log(result.response.text())
    if (result.response.text()) {
      const resp = await db.insert(JsonForms)
        .values({
          jsonform: result.response.text(),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD/MM/yyyy')
        })
        .returning({ id: JsonForms.id })

      console.log("New Form ID", resp[0].id)
      if (resp[0].id) {
        route.push('/edit-form/' + resp[0].id)
      }
      setLoading(false)
    }
    setLoading(false)
  }

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new form </DialogTitle>
            <DialogDescription>
              <Textarea
                className="my-2"
                onChange={(event) => setUserInput(event.target.value)}
                placeholder="Write description of your form"
              />
              <div className='flex gap-2 my-3 justify-end'>
                <Button
                  onClick={() => setOpenDialog(false)}
                  variant="destructive"
                >
                  Cancel
                </Button>
                <Button
                  disabled={loading}
                  onClick={() => onCreateForm()}
                >
                  {loading ? <Loader2 className='animate-spin' /> : 'Create'}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateForm