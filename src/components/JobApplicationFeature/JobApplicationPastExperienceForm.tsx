import { useFieldArray, useForm } from "react-hook-form"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RHFDatePickerField } from "../FormFields/RHFDatePicker/RHFDatePicker"

const schema = z.object({
    roles: z.array(
        z.object({
            roleName: z.string().nonempty({ message: 'Please provide your role name' }),
            companyName: z.string().nonempty({ message: 'Please provide your company name' }),
            startDate: z.number().refine((value) => {
                return value > 0
            }, { message: 'Please provide a valid start date'}),
            endDate: z.number(),
            currentlyWorkingHere: z.boolean().optional(),
        })
            .superRefine((value, ctx) => {
                if ( value.currentlyWorkingHere ) {
                    // don't change anyhing
                    return z.NEVER
                }

                if ( value.endDate === -1 ) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        path: ['endDate'],
                        message: 'Please provide a valid end date',
                    })
                }

                if ( value.startDate > value.endDate ) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        path: ['endDate'],
                        message: 'End date must be after start date',
                    })
                }
            })
    )
})

const defaultFieldArrayObject = {
    roleName: '',
    companyName: '',
    startDate: -1,
    endDate: -1,
    currentlyWorkingHere: false,
}

export type JobApplicationPastExperienceFormValues = z.infer<typeof schema>
  

interface JobApplicationPastExperienceFormProps {
    onSubmitReady: (values: unknown) => void
    initialValues?: JobApplicationPastExperienceFormValues
}

export const JobApplicationPastExperienceForm = (props: JobApplicationPastExperienceFormProps) => {
    const { initialValues } = props
    const {handleSubmit, control, register, formState: {errors}, watch} = useForm<JobApplicationPastExperienceFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            roles: initialValues && initialValues.roles.length > 0 ? initialValues.roles :  [{...defaultFieldArrayObject}]
        }
    })  

    const {fields, append} = useFieldArray({
        control,
        name: 'roles',
    })

    const fieldSections = fields.map((field, idx) => {
        const fieldErrors = errors.roles?.[idx]
        const { id } = field
        const currentlyWorkingHereValue = watch(`roles.${idx}.currentlyWorkingHere`)
        return (
            <div key={id}>
                <div className="mb-4">
                    <label htmlFor="role-name" className="block text-gray-700 font-bold mb-2">
                        Role Name
                    </label>
                    <input
                        type="text"
                        id="role-name"
                        className="form-input h-10 border-2 rounded-md text-gray-900 focus:outline-none"
                        {...register(`roles.${idx}.roleName`)}
                    />
                    {
                        fieldErrors?.roleName && <p className="text-red-500 text-xs italic">{fieldErrors.roleName.message?.toString()}</p>
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="company-name" className="block text-gray-700 font-bold mb-2">
                        Company Name
                    </label>
                    <input
                        type="text"
                        id="company-name"
                        className="form-input h-10 border-2 rounded-md text-gray-900 focus:outline-none"
                        {...register(`roles.${idx}.companyName`)}
                    />
                    {
                        fieldErrors?.companyName && <p className="text-red-500 text-xs italic">{fieldErrors.companyName.message?.toString()}</p>
                    }
                </div>
                <div className="flex mb-4">
                    <div className="w-1/2 mr-2">
                        <label htmlFor="start-date" className="block text-gray-700 font-bold mb-2">
                            Start Date
                        </label>
                        <RHFDatePickerField
                            control={control}
                            name={`roles.${idx}.startDate`}
                        />
                    </div>
                    {
                        currentlyWorkingHereValue ? null : (
                            <div className="w-1/2 ml-2">
                                <label htmlFor="end-date" className="block text-gray-700 font-bold mb-2">
                                    End Date
                                </label>
                                <RHFDatePickerField
                                    control={control}
                                    name={`roles.${idx}.endDate`}
                                />
                            </div>
                        )
                    }
                    
                </div>
                <div className="flex mb-4 items-center">
                    <input
                        type="checkbox"
                        id={`roles.${idx}.currentlyWorkingHere`}
                        className="form-checkbox h-5 w-5 text-blue-500"
                        {...register(`roles.${idx}.currentlyWorkingHere`)}
                    />
                    <label htmlFor={`roles.${idx}.currentlyWorkingHere`} className="ml-2 block text-gray-700 font-bold">
                        Currently working here
                    </label>
                </div>
            </div>
        )
    })

    return (
        <form className="bg-gray-100 p-8" onSubmit={handleSubmit(props.onSubmitReady)}>
            {fieldSections}
            <div className="flex justify-between">
                <button
                    onClick={() => {
                        append({...defaultFieldArrayObject})
                    }}
                    type="button"
                    className="form-submit bg-gray-200 hover:bg-gray-700 text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                >
                    Add Another Position
                </button>
                <button
                    type="submit"
                    className="form-submit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}
  