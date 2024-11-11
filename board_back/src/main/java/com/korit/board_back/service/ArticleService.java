package com.korit.board_back.service;

import com.korit.board_back.dto.ResponseDto;
import com.korit.board_back.dto.article.request.ArticleRequestDto;
import com.korit.board_back.dto.article.request.ArticleUpdateRequestDto;
import com.korit.board_back.dto.article.response.ArticleResponseDto;

public interface ArticleService {

    ResponseDto<ArticleResponseDto> createArticle(Long authorId, ArticleRequestDto dto);
    ResponseDto<ArticleResponseDto> updateArticle(Long authorId, Long id, ArticleUpdateRequestDto dto);
    ResponseDto<Void> deleteArticle(Long authorId, Long id);
    ResponseDto<ArticleResponseDto> getArticle(Long id);
    ResponseDto<ArticleResponseDto> getEditableArticle(Long authorId, Long id);
}
