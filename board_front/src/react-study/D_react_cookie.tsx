import React from 'react'
import { useCookies } from 'react-cookie'
/*
! react-cookie
: React에서 쿠키를 쉽게 관리 할 수 있도록 도와주는 "라이브러리"

- 쿠키의 생성, 접근, 수정, 삭제 기능을 담당

<설치 명령어>
npm i react-cookie
npm i --save @type/react-cookie

<기본 사용법>
react-cookie는 useCookie 훅을 통해 

`쿠키(cookie)` , `쿠키 설정함수(setCookie)` , `쿠키 제거함수(removeCookie)`를 반환


const [cookie, setCookie, removeCookie] = useCookies(['쿠키이름(인자값)']);

▶️ useCookie 훅에 전달되는 배열(인자값)

: 배열로써 관리하고자 하는 쿠키의 이름을 전달

: 사용자가 현재 컴포넌트에서 접근하려는 쿠키이름을 지정하는 역할

- 쿠키에 대한 접근: ‘cookie.쿠키이름’을 통해 쿠키값 반환

*/
export default function D_react_cookie() {
  const [ cookies, setCookie, removeCookie ] = useCookies(['user']);

  // 쿠키 설정 함수
  const handleSetCookie = () => {
    //setCookie('쿠키이름', '쿠키값', '옵션설정-선택')
    setCookie('user', '홍길동', { 
      path: '/',
      expires : new Date(Date.now() + 1000 * 60 * 60 * 24)
    });
  }
  // 쿠키 삭제 함수
  const handleRemoveCookie = () => {
    // removeCookie('쿠키이름', 옵셥선택- 설정)
    removeCookie('user', { path: '/' });
  }

  return (
    <div>
      <button onClick={handleSetCookie}>쿠키 설정 함수</button>
      <button onClick={handleRemoveCookie}>쿠키 삭제 함수</button>
    </div>
  )
}