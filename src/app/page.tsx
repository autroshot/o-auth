'use client';

import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
    const [result, setResult] = useState('결과가 이곳에 표시됩니다.');

    return (
        <main className="flex min-h-screen flex-col items-center gap-6 p-20">
            <Link
                className="bg-yellow-300 p-3 rounded-md"
                href="/api/authorize"
            >
                로그인
            </Link>
            <button
                className="bg-yellow-300 p-3 rounded-md"
                onClick={handleLogout}
            >
                로그아웃
            </button>
            <button
                className="bg-yellow-300 p-3 rounded-md"
                onClick={handleValidate}
            >
                로그인 확인
            </button>
            <div className="border-black border-2 rounded-md min-w-72 p-3 text-center">
                {result}
            </div>
        </main>
    );

    async function handleLogout() {
        const res = await axios.get('/api/logout');
        setResult(res.data);
    }

    async function handleValidate() {
        const res = await axios.get('/api/validate');
        setResult(res.data);
    }
}
