import { forwardRef, useImperativeHandle, useMemo, useState } from "react"
import { JobApplicationBasicDetailsForm, JobApplicationBasicDetailsFormValues } from "./JobApplicationBasicDetailsForm"
import { JobApplicationPastExperienceForm, JobApplicationPastExperienceFormValues } from './JobApplicationPastExperienceForm'
import { TabNavigation } from "./JobApplicationTabs"

interface MultipartJobApplicationFormWrapperProps {
    formValues: {
        form1: JobApplicationBasicDetailsFormValues,
        form2: JobApplicationPastExperienceFormValues
    }
    onForm1SubmitReady: (values: unknown) => unknown
    onForm2SubmitReady: (values: unknown) => unknown
}

export interface MultipartJobApplicationFormWrapperRef {
    setCurrentPart: (newPart: number) => void
}

export const MultipartJobApplicationFormWrapper = forwardRef<MultipartJobApplicationFormWrapperRef, MultipartJobApplicationFormWrapperProps>((props, ref) => {

    
    const lastValidFormPart = useMemo(() => {
        return props.formValues.form1 ? 2 : 1
    }, [props.formValues])
        
    const [part, setPart] = useState(lastValidFormPart)

    useImperativeHandle(ref, () => {
        return {
            setCurrentPart: (newPart:number) => {
                setPart(newPart)
            }
        }
    }, [])
    
    return (
        <div>
            {/* // tab navi */}
            <div className="flex border-b border-gray-200">
                <TabNavigation 
                    part={part}
                    lastValidFormPart={lastValidFormPart}
                    onPartChange={(newPart) => {
                        if ( newPart < 1 ) {
                            throw new Error('Part cannot be less than 1')
                        }
                        setPart(newPart)
                    }}
                />
            </div>
            {
                part === 1 && (
                    <JobApplicationBasicDetailsForm initialValues={props.formValues.form1} onSubmitReady={props.onForm1SubmitReady} />
                )
            }
            {
                part === 2 && (
                    <JobApplicationPastExperienceForm initialValues={props.formValues.form2} onSubmitReady={props.onForm2SubmitReady} />
                )
            }
        </div>
    )
})

MultipartJobApplicationFormWrapper.displayName = 'forwarded(MultipartJobApplicationFormWrapper)'