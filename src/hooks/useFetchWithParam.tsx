import { clientApi } from "../api/clientApi";
import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

const useFetchWithParam = (url: string, params: {}) => {
    const { token } = useAuth();
    const fetchItem = async () => {
        const res = await clientApi.get(url, {
            headers: {
                "x-auth-token": token,
            },
            params,
        });

        return res.data;
    };

    return useQuery({
        queryKey: [url, params],
        queryFn: fetchItem,
    });
};

export default useFetchWithParam;
