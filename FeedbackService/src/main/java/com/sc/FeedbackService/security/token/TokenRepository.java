package com.sc.FeedbackService.security.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {
//    @Query(value = """
//        select t from Token  t inner join  AppUser  appuser
//        on t.appUser.id = appuser.id
//        where  appuser.id = :id and (t.isExpired = false or t.isRevoked = false )
//        """)
    @Query(value = """
        select t from Token t inner join AppUser  appuser
        on t.appUser.id = appuser.id
        where appuser.id = :id and (t.isExpired = false  or t.isRevoked = false)
    """)
    List<Token> findAllValidTokenByUser(Long id);
    List<Token> findAllByAppUserId(Long userId);
    Optional<Token> findByToken(String token);

}
