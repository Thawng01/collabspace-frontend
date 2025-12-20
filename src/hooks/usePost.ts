import { useMutation } from '@tanstack/react-query'
import { clientApi } from '../api/clientApi'
import { useAuth } from '../contexts/AuthContext'
export const usePost = (url: string, callback?: (value: any) => void) => {
    const { token } = useAuth()

    const createItem = async (data: any) => {
        const res = await clientApi.post(url, data, {
            headers: {
                "x-auth-token": token
            }
        })
        return res.data

    }

    return useMutation<any, any, any>({
        mutationKey: [url],
        mutationFn: createItem,


        onSuccess(data) {
            callback && callback(data)
        },
    })
}