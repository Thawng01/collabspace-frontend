
import { clientApi } from '../api/clientApi'
import { useAuth } from '../contexts/AuthContext'
import { useQuery } from '@tanstack/react-query'

const useFetch = (url: string) => {

    const { token } = useAuth()
    const fetchItem = async () => {
        const res = await clientApi.get(url, {
            headers: {
                "x-auth-token": token
            }
        })

        return res.data
    }


    return useQuery({
        queryKey: [url],
        queryFn: fetchItem
    })
}

export default useFetch