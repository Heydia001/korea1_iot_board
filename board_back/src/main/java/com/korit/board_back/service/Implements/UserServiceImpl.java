package com.korit.board_back.service.Implements;

import com.korit.board_back.common.ResponseMessage;
import com.korit.board_back.dto.ResponseDto;
import com.korit.board_back.dto.user.request.UpdateUserRequestDto;
import com.korit.board_back.dto.user.response.UserResponseDto;
import com.korit.board_back.entity.User;
import com.korit.board_back.repository.UserRepository;
import com.korit.board_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

/*
   Implements 축약어: Impl
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public ResponseDto<UserResponseDto> getUserInfo(String userId) {
        UserResponseDto data = null;
        try {
            User user = userRepository.findByUserId(userId)
                    .orElse(null);
            if(user == null) {
                return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
            }
            data = new UserResponseDto(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    @Override
    public ResponseDto<UserResponseDto> updateUser(String userId, UpdateUserRequestDto dto) {
        UserResponseDto data = null;
        String email = dto.getEmail();
        String name = dto.getName();
        String phone = dto.getPhone();
        try {
            User user = userRepository.findByUserId(userId)
                    .orElse(null);
            if(user == null) ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);

//            user.setEmail(email);
//            user.setName(name);
//            user.setPhone(phone);

            user = user.toBuilder()
                    .email(email)
                    .name(name)
                    .phone(phone)
                    .build();

            userRepository.save(user);
            data = new UserResponseDto(user);


        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    @Override
    public ResponseDto<Void> deleteUser(String userId) {
        ResponseDto<Void> data = null;

        try {
            User user = userRepository.findByUserId(userId)
                    .orElse(null);

            userRepository.delete(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, null);
    }
}
