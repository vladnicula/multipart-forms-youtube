import { useForm } from "react-hook-form"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    fullName: z.string().nonempty({ message: 'Please provide your full name' }),
    email: z.string().optional(),
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    country: z.string().optional(),
    zipCode: z.string().optional(),
    // email: z.string().email({ message: 'Please provide a valid email address' }),
    // addressLine1: z.string().nonempty({ message: 'Please provide your address' }),
    // addressLine2: z.string().optional(),
    // country: z.string().nonempty({ message: 'Please select your country' }),
    // zipCode: z.string().nonempty({ message: 'Please provide your postal code' }),
})
  
export type JobApplicationBasicDetailsFormValues = z.infer<typeof schema>

interface JobApplicationBasicDetailsFormProps {
    onSubmitReady: (values: JobApplicationBasicDetailsFormValues) => void
    initialValues?: JobApplicationBasicDetailsFormValues
}
export const JobApplicationBasicDetailsForm = (props: JobApplicationBasicDetailsFormProps) => {
    const {handleSubmit, register, formState: { errors }} = useForm<JobApplicationBasicDetailsFormValues>({
        resolver: zodResolver(schema),
        defaultValues: props.initialValues ?? {},
    })
  
    return (
        <form className="bg-gray-100 p-8"
            onSubmit={handleSubmit(props.onSubmitReady)}>
            <div className="mb-4">
                <label htmlFor="full-name" className="block text-gray-700 font-bold mb-2">
                    Full Name
                </label>
                <input
                    type="text"
                    id="full-name"
                    className="form-input h-10 border-2 rounded-md text-gray-900 focus:outline-none"
                    {...register('fullName')}
                />
                {
                    errors.fullName && <p className="text-red-500 text-xs italic">{errors.fullName.message?.toString()}</p>
                }
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    className="form-input h-10 border-2 rounded-md text-gray-900 focus:outline-none"
                      
                    {...register('email')}
                />
                {
                    errors.email && <p className="text-red-500 text-xs italic">{errors.email.message?.toString()}</p>
                }
            </div>
            <div className="flex mb-4">
                <div className="w-1/2 mr-2">
                    <label htmlFor="address-line-1" className="block text-gray-700 font-bold mb-2">
                        Address Line 1
                    </label>
                    <input
                        type="text"
                        id="address-line-1"
                        className="form-input h-10 border-2 rounded-md text-gray-900 focus:outline-none"
                        {...register('addressLine1')}
                    />
                    {
                        errors.addressLine1 && <p className="text-red-500 text-xs italic">{errors.addressLine1.message?.toString()}</p>
                    }
                </div>
                <div className="w-1/2 ml-2">
                    <label htmlFor="address-line-2" className="block text-gray-700 font-bold mb-2">
                        Address Line 2
                    </label>
                    <input
                        type="text"
                        id="address-line-2"
                        className="form-input h-10 border-2 rounded-md text-gray-900 focus:outline-none"
                        {...register('addressLine2')}
                    />
                    {
                        errors.addressLine2 && <p className="text-red-500 text-xs italic">{errors.addressLine2.message?.toString()}</p>
                    }
                </div>
            </div>
            <div className="flex mb-4">
                <div className="w-1/2 mr-2">
                    <label htmlFor="country" className="block text-gray-700 font-bold mb-2">
                        Country
                    </label>
                    <select
                        id="country"
                        className="form-select appearance-none h-10 border-2 rounded-md text-gray-900 focus:outline-none"
                        {...register('country')}
                    >
                        <option value="" disabled selected>Select a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="JP">Japan</option>
                        <option value="CN">China</option>
                        <option value="IN">India</option>
                        <option value="BR">Brazil</option>
                        <option value="FR">France</option>
                    </select>
                    {
                        errors.country && <p className="text-red-500 text-xs italic">{errors.country.message?.toString()}</p>
                    }
                </div>
                <div className="w-1/2 ml-2">
                    <label htmlFor="zip" className="block text-gray-700 font-bold mb-2">
                        ZIP/Postal Code
                    </label>
                    <input
                        type="text"
                        id="zip"
                        className="form-input h-10 border-2 rounded-md text-gray-900 focus:outline-none"
                        {...register('zipCode')}
                    />
                    {
                        errors.zipCode && <p className="text-red-500 text-xs italic">{errors.zipCode.message?.toString()}</p>
                    }
                </div>
            </div>
            <div className="flex justify-center">
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
  