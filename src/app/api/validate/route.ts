import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const accessToken = cookies().get('access-token');

    if (accessToken === undefined)
        return new Response('로그인 정보가 없습니다.');

    try {
        const res = await axios.get(
            'https://kapi.kakao.com/v1/user/access_token_info',
            {
                headers: { Authorization: `Bearer ${accessToken.value}` },
            }
        );

        const id = res.data.id;

        return new Response(`id: ${id}`);
    } catch (err) {
        if (err instanceof AxiosError) {
            return new Response('로그인 정보가 없습니다.');
        }
        console.error(err);
    }
}
