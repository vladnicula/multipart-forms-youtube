// next api handler with typescript

import { NextApiRequest, NextApiResponse } from 'next'


// this is just for the tutorial
// DO NOT DO THIS IN PRODUCTION
let GLOBAL_FORM_DATA = {}

// api handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
    // get the form data from the request body
    const formData = req.body
    console.log('formData', formData, GLOBAL_FORM_DATA)

    // if get
    if (req.method === 'GET') {
        // return the form data
        return res.status(200).json({formData: GLOBAL_FORM_DATA})
    }
    
    // else save data
    // save the form data in a global variable
    const theFormKey = Object.keys(formData)[0]

    GLOBAL_FORM_DATA = {
        ...GLOBAL_FORM_DATA,
        [theFormKey]: formData[theFormKey]
    }

    // do something with the form data
    // ...
    // return a response
    res.status(200).json({ message: 'success', formData: GLOBAL_FORM_DATA })
}
