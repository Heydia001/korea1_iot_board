package com.korit.board_back.dto.user.response;

import com.korit.board_back.entity.User;
import lombok.Getter;

@Getter
public class UserResponseDto {
    // 비밀번호 없음
    private String userId;
    private String email;
    private String name;
    private String phone;
    private String gender;

    // setter역할을 대신 하는 생성자
    public UserResponseDto(User user) {
        this.userId = user.getUserId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.phone = user.getPhone();
        this.gender = user.getGender();
    }
}
