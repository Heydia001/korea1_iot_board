import React from 'react'
import UseState from '../../react-study/A_useState';
import UseEffect from '../../react-study/B_useEffect';
import StateEffect from '../../react-study/C_StateEffect';
import ReactCookie from '../../react-study/D_react_cookie';
import Practice from '../../react-study/Z_Practice';
import ZustandRender from '../../react-study/E_zustand';
import Zustand from '../../react-study/E_zustand_render';

export default function ReactStudy() {
  return (
    <>
      <h2>Use State 상태관리</h2>
      <UseState />

      <h2>UseEffect: 부수효과</h2>
      <UseEffect />

      <h2>StateEffect: Menu 검색구현</h2>
      <StateEffect />

      <h2>react-cookie: 쿠키 상태 관리</h2>
      <ReactCookie />
      
      <h2>연습</h2>
      <Practice />
            
      <h2>zustand 전역 상태 관리</h2>
      <ZustandRender />
      <Zustand />
    </>
  )
}
