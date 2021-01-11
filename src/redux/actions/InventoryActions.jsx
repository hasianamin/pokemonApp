export const CaptureFunc=(data)=>{
    return{
        type: 'CAPTURE',
        payload: data
    }
}

export const ReleaseFunc=(data)=>{
    return{
        type: 'RELEASE',
        payload: data
    }
}

export const RetrieveFunc=(data)=>{
    return {
        type: 'RETRIEVE',
        payload: data
    }
}