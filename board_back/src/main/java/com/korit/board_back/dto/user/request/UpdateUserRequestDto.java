package com.korit.board_back.dto.user.request;

import com.korit.board_back.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UpdateUserRequestDto {
    private String email;
    private String name;
    private String phone;
}
