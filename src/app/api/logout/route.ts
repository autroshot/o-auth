import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const accessToken = cookies().get('access-token');

    if (accessToken === undefined)
        return new Response('로그아웃이 완료되었습니다.');

    try {
        await axios.get('https://kapi.kakao.com/v1/user/logout', {
            headers: { Authorization: `Bearer ${accessToken.value}` },
        });
    } catch (err) {
        console.error(err);
    } finally {
        cookies().delete('access-token');
        return new Response('로그아웃이 완료되었습니다.');
    }
}
