import React, { useState } from 'react';
import api from '../services/api';
import { useRouter } from 'next/router';

export default function LoginPage(){
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.accessToken);
      router.push('/dashboard');
    } catch (e:any) {
      setError(e?.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12, width: 320 }}>
        <h2>Đăng nhập Quản trị</h2>
        {error ? <div style={{ color: 'red' }}>{error}</div> : null}
        <input placeholder="Tên đăng nhập" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input placeholder="Mật khẩu" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}


