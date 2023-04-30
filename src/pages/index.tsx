import { JobApplicationBasicDetailsFormValues } from '@/components/JobApplicationFeature/JobApplicationBasicDetailsForm'
import { JobApplicationPastExperienceFormValues } from '@/components/JobApplicationFeature/JobApplicationPastExperienceForm'
import { MultipartJobApplicationFormWrapper, MultipartJobApplicationFormWrapperRef } from '@/components/JobApplicationFeature/MultipartJobApplicationFormWrapper'
import { Inter } from 'next/font/google'
import { useEffect, useRef, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const [ formData, setFormData ] = useState<{
      form1: JobApplicationBasicDetailsFormValues,
      form2: JobApplicationPastExperienceFormValues
    } | null>(null) 
  
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('/api/job-application')
                const data = await response.json()
                console.log(
                    'data.formData', data.formData
                )
                setFormData(data.formData)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    const handleJobApplicationBasicDetailsFormSubmit = async (values: unknown) => {
        const response = await (await fetch('/api/job-application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'form1': values
            }),
        })).json()
        setFormData(response.formData)
        multiformRef.current?.setCurrentPart(2)
    }

    const handleJobApplicationPastExperienceFormSubmit = async (values: unknown) => {
        await fetch('/api/job-application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'form2': values
            }),
        })
    }

    const multiformRef = useRef<MultipartJobApplicationFormWrapperRef>(null)

    // this will probably change with server components
    if ( !formData) {
        return null
    }

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <MultipartJobApplicationFormWrapper
                ref={multiformRef}
                formValues={formData}
                onForm1SubmitReady={handleJobApplicationBasicDetailsFormSubmit}
                onForm2SubmitReady={handleJobApplicationPastExperienceFormSubmit}
            />
        </main>
    )
}

