import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AUTH_PATH } from '../../constants';
import Footer from '../Footer';
import Header from '../Header';

/*
! Outlet 컴포넌트
: 라우트 계층 구조에서 상위 라우트의 자식 컴포넌트 렌더링 역할
- Outlet이 위치한 곳에 자식 라우트가 표시
- 상위 라우트의 레이아웃을 공통으로 사용 + 자식 라우트만의 컴포넌트를 렌더링
*/

export default function Container() {
  // useLocation()
  // : 리액트 라우터 라이브러리에서 제공하는 훅 (Hook)
  // - 현재 페이지의 정보를 가져옴(현재 경로, 쿼리파라미터 등)

  // const location = useLocation();
  // location.pathname : 현재경로

  const { pathname } = useLocation();


  return (
    <>
      <Header />
      <hr />

      {/* 자식 컴포넌트가 해당 위치에서 렌더링 */}
      <Outlet /> 
      
      {/* 현재 경로가 AUTH_PATH (로그인, 회원가입)이 아니면 Footer 표시 */}
      <hr />
      {pathname !== AUTH_PATH && <Footer />}
      {/* {pathname === AUTH_PATH || <Footer />} */}
      {/* {AUTH_PATH} */}
      {/* <Footer /> */}
    </>
  )
}