import { getEnvValue } from '@/utils/env';
import { redirect } from 'next/navigation';

export async function GET(req: Request): Promise<void> {
    const url = new URL('https://kauth.kakao.com/oauth/authorize');
    url.searchParams.append('client_id', getEnvValue('CLIENT_ID'));
    url.searchParams.append('redirect_uri', getEnvValue('REDIRECT_URI'));
    url.searchParams.append('response_type', 'code');

    redirect(url.toString());
}
