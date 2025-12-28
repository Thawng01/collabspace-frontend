import { useMutation } from '@tanstack/react-query'
import { clientApi } from '../api/clientApi'
import { useAuth } from '../contexts/AuthContext'
export const useUpdate = (url: string, callback?: (value: any) => void) => {
    const { token } = useAuth()
    const updateItem = async (data: any) => {
        try {
            const res = await clientApi.put(url, data, {
            headers: {
                "x-auth-token": token
            }
        })
        return res.data
        } catch (error) {
            console.log("hello error : ", error)
        }
        
    }

    return useMutation<any, any, any>({
        mutationKey: [url],
        mutationFn: updateItem,


        onSuccess(data) {
            callback && callback(data)
        },
    })
}