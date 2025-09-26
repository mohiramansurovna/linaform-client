import {useQuery} from '@tanstack/react-query';
import {type AccessToken, AccessTokenSchema} from '@/schemas';


//@ts-ignore
const url=import.meta.env.VITE_API_URL as string;
export const useRefreshTokenQuery = () => {
    const fetchAccessToken = async () => {
        return await fetch(url+'/api/auth/refresh', {
            method: 'POST',
            credentials: 'include',
        }).then(async res => {
            if (!res.ok) {
                console.log("we got error here")
                throw new Error((await res.json()).error ?? 'Failed to refresh token');
            }
            const json = await res.json();
            return AccessTokenSchema.parse(json);
        });
    };

    return useQuery<AccessToken, Error, AccessToken, ['refresh-token']>({
        queryKey: ['refresh-token'],
        queryFn: fetchAccessToken,
        refetchInterval: 14 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        retry: false,
        enabled: true,
    });
};
