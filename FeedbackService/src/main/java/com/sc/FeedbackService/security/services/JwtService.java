package com.sc.FeedbackService.security.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Component
public class JwtService {
    @Value("${jwt.access.expiration}")
    private long accessExpiration;
    @Value("${jwt.refresh.expiration}")
    private long refreshExpiration;
    @Value("${jwt.secret_key}")
    private String jwtSecretKey;

    public String extractUsername(String jwtToken) {
        return extractClaim(jwtToken, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String generateAccessToken(HashMap<String, Object> claims, String email){
        return buildJwtToken(claims, email, accessExpiration);
    }

    public String generateRefreshToken(HashMap<String, Object> claims, String email){
        return buildJwtToken(claims, email, refreshExpiration);
    }

    private String buildJwtToken(HashMap<String, Object> claims, String email, long expiration) {
        final Date expiredAt = Date.from(Instant.now().plusSeconds(expiration));
        return Jwts.builder()
                .setIssuer("Spring Security")
                .setIssuedAt(Date.from(Instant.now()))
                .setClaims(claims)
                .setSubject(email)
                .setExpiration(expiredAt)
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isValidToken(String token, String email){
        final String userEmail = extractUsername(token);
        return (userEmail.equals(email)) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}


