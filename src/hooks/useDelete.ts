import { useMutation } from '@tanstack/react-query'
import { clientApi } from '../api/clientApi'
import { useAuth } from '../contexts/AuthContext'
export const useDelete = (url: string, callback?: (value: any) => void) => {
    const { token } = useAuth()

    const createItem = async () => {
        const res = await clientApi.delete(url, {
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