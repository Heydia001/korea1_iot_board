import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Header from '../../../layouts/Header';

//? Interface
// 사용자 입력 정보의 상태를 나타냄
// cridential: 자격증, 신원 정보
interface Credentials {
  email: string;
  password: string;
}

// 서버에서 반환하는 로그인 응답 데이터의 형태를 나타냄
interface SignInResponseDto {
  token: string;
  user: Credentials;
  exprTime: number;
}

//? Main Component: Login Component
export default function SignIn() {
  //  == 로그인 된 사용자 정보를 컴포넌트 내에서 관리하는 state == 
  const [user, setUser] = useState<Credentials>({
    email:'',
    password:''
  });

  //! state
  // state: 로그인 입력 필드 상태
  const [credentials, setCredentials] = useState<Credentials>({
    email:'',
    password: ''
  });

  // state: 오류메세지를 저장 할 상태
  const [error, setError] = useState<string>('');

  // state: React Cookie 훅을 사용하여 쿠키를 설정하는 함수
  const [, setCookie] = useCookies(['token']);

  // state: useUserStore() 훅을 사용하여 사용자 정보를 전역 상태에 저장
  // const { setUser } = useUserStore();

  //! Hooks: 기능정의
  // function: 페이지 변환
  const navigate = useNavigate();

  // function: 로그인 성공 시 실행되는 함수
  // 로그인 성공 시 실행
  // : 서버 응답이 성공일 경우 토큰과 사용자 정보를 저장 & 페이지 이동
  const handleSignInSuccessResponse = (data: SignInResponseDto) => {
    if(data) {
      const {token, exprTime, user} = data;
      setToken(token, exprTime);
      setUser(user);
      navigate('/');
    } else {
      setError('로그인 실패, 인증 정보를 확인해 주세요')
    }
  }

  // function: 인증 토큰을 저장하는 함수
  const setToken = (token: string, exprTime: number) => {
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
    setCookie('token', token, {
      path: '/',
      expires
    });
  } 

  //! EventHandler 
  // event handler: 로그인 입력필드 입력 이벤트 처리 함수
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;

    setCredentials({
      ...credentials,
      [element.name]: element.value
    })
  }

  // event handler: 로그인 버튼 클릭 이벤트 처리 함수
  const handleSignIn = async() => {
    const {email, password} = credentials;
    // email O - password O : false > 실행 X
    // email X - password O : false > 실행 O
    // email O - password X : false > 실행 O
    if(!email || !password){
      setError('아이디와 비밀번호 모두 입력해주세요.');
    }

    try {
      const response = await axios.post(`http://localhost:8080/api/v1/auth/signIn`, credentials);

      if(response.data){
        handleSignInSuccessResponse(response.data.data);
      }
      
    } catch (error) {
        setError('로그인 중 문제가 발생했습니다.')
    }
  }


  // render: 로그인 컴포넌트 렌더링
  return (
    <Card variant='outlined' sx={{
      width: 360,
      m: 'auto',
      mt: 4
    }}>
      <CardContent>
        <Typography variant='h5' mb={2}>
          로그인
        </Typography>

        {/* 입력 필드 */}
        <TextField
          label="이메일"
          type="email"
          name="email"
          variant="outlined"
          value={credentials.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="비밀번호"
          type="password"
          name="password"
          variant="outlined"
          value={credentials.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        {error && (
          <Typography color='error' mt={2}>
            {error}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button 
          onClick={handleSignIn} 
          fullWidth 
          variant='contained' 
          color='primary'
        >
          로그인
        </Button>
      </CardActions>
    </Card>
  )
}