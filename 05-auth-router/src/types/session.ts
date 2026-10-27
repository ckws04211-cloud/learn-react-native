export type SessionContextType = {
  session: string | null; // 로그인한 이메일. 로그아웃이면 null
  userName: string; // 화면에 보여줄 이름
  signIn: (email: string) => void;
  signOut: () => void;
  setUserName: (name: string) => void;
};
