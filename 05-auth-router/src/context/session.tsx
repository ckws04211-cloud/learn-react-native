import { SessionContextType } from '@/types/session';
import { createContext, ReactNode, use, useState } from 'react';

// src/context/session.tsx
const SessionContext = createContext<SessionContextType | null>(null); // ① 상자

export function SessionProvider({ children }: { children: ReactNode }) {
  // ② 상태를 들고 있는 Provider
  const [session, setSession] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const signIn = (email: string) => {
    setSession(email);
    setUserName(email.split('@')[0]);
  };
  const signOut = () => {
    setSession(null);
    setUserName('');
  };
  return (
    <SessionContext.Provider
      value={{ session, userName, signIn, signOut, setUserName }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  // ③ 꺼내는 훅
  const ctx = use(SessionContext);
  if (!ctx) throw new Error('useSession은 SessionProvider 안에서 사용하세요');
  return ctx;
}
