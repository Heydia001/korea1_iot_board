package com.korit.board_back.service.Implements;

import com.korit.board_back.common.ResponseMessage;
import com.korit.board_back.dto.ResponseDto;
import com.korit.board_back.dto.article.request.ArticleRequestDto;
import com.korit.board_back.dto.article.request.ArticleUpdateRequestDto;
import com.korit.board_back.dto.article.response.ArticleResponseDto;
import com.korit.board_back.entity.Article;
import com.korit.board_back.repository.ArticleRepository;
import com.korit.board_back.service.ArticleService;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleServiceImpl(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Override
    public ResponseDto<ArticleResponseDto> createArticle(Long authorId, ArticleRequestDto dto) {
        ArticleResponseDto data = null;
        String title = dto.getTitle();
        String content = dto.getContent();

        try {
            Article article = Article.builder()
                    .title(title)
                    .content(content)
                    .authorId(authorId)
                    .build();

            articleRepository.save(article);

            data = new ArticleResponseDto(article);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    @Override
    public ResponseDto<ArticleResponseDto> updateArticle(Long authorId, Long id, ArticleUpdateRequestDto dto) {
        ArticleResponseDto data = null;
        String title = dto.getTitle();
        String content = dto.getContent();
        Long articleId = id;

        try {
            Optional<Article> optionalArticle = articleRepository.findByIdAndAuthorId(articleId, authorId);
            if(optionalArticle.isEmpty()) ResponseDto.setFailed(ResponseMessage.NOT_EXIST_POST);

            // 포장지를 벗기는 것과 동일하다.
            Article article = optionalArticle.get();

            article = article.toBuilder()
            .title(title)
            .content(content)
            .authorId(authorId)
            .build();

            articleRepository.save(article);

            new ArticleResponseDto(article);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    @Override
    public ResponseDto<Void> deleteArticle(Long authorId, Long id) {
        Long articleId = id;

        try{
            Optional<Article> optionalArticle = articleRepository.findByIdAndAuthorId(articleId, authorId);
            if(optionalArticle.isEmpty()) ResponseDto.setFailed(ResponseMessage.NOT_EXIST_POST);

            Article article = optionalArticle.get();

            articleRepository.delete(article);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
    }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, null);
    }

    @Override
    public ResponseDto<ArticleResponseDto> getArticle(Long id){
        ArticleResponseDto data = null;
        Long articleId = id;
        try{
            Optional<Article> optionalArticle = articleRepository.findById(articleId);
            if(optionalArticle.isEmpty()) ResponseDto.setFailed(ResponseMessage.NOT_EXIST_POST);

            Article article = optionalArticle.get();
            data = new ArticleResponseDto(article);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    @Override
    public ResponseDto<ArticleResponseDto> getEditableArticle(Long authorId, Long id) {
        Long articleId = id;
        ArticleResponseDto data = null;

        try {
            Optional<Article> optionalArticle = articleRepository.findById(articleId);

            if(optionalArticle.isEmpty()) ResponseDto.setFailed(ResponseMessage.NOT_EXIST_POST);

            Article article = optionalArticle.get();

            if(!article.getAuthorId().equals(authorId)) ResponseDto.setFailed(ResponseMessage.NO_PERMISSION);

            data = new ArticleResponseDto(article);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

}
