import { getEnvValue } from '@/utils/env';
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const authorizationCode = searchParams.get('code');

    const res = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        {
            grant_type: 'authorization_code',
            client_id: getEnvValue('CLIENT_ID'),
            redirect_uri: getEnvValue('REDIRECT_URI'),
            code: authorizationCode,
        },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );
    const accessToken = res.data.access_token;

    cookies().set('access-token', accessToken, {
        secure: true,
        httpOnly: true,
    });

    redirect('/');
}
