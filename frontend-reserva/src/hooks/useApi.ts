import { useEffect, useState } from 'react';
import { ApiResponse } from '../api/api';



export function useApi<T>(fetchApi: (...props: any) => Promise<ApiResponse<T>>, defaultDataValue: T): [T, boolean, any, () => void]{
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T>(defaultDataValue);
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh);
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            fetchApi().then(async (data) => {
                /*if(data.statusCode !== 200){
                    return;   
                }*/

                setData(data.data || defaultDataValue);

            }).finally(() => setLoading(false))
        })();
    }, [refresh])

    return [data , loading, setData, handleRefresh]
}