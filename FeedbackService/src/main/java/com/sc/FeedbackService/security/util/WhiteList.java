package com.sc.FeedbackService.security.util;

import lombok.Getter;
@Getter
public class WhiteList {
    public static String[] freeAccess() {
        return new String[]{
                "api/v*/auth/register",
                "api/v*/auth/confirm",
                "api/v*/auth/login",
        };
    }

    public static String[] swagger() {
        return new String[]{
                "/v2/api-docs",
                "/v3/api-docs",
                "/v3/api-docs/**",
                "/swagger-resources",
                "/swagger-resources/**",
                "/configuration/ui",
                "/configuration/security",
                "/swagger-ui/**",
                "webjars/**",
                "/swagger-ui.html"
        };
    }

//    private static final HandlerMappingIntrospector handlerMappingIntrospector = new HandlerMappingIntrospector();
//    public static MvcRequestMatcher freeAccess() {
//    return new MvcRequestMatcher(handlerMappingIntrospector,
//            "/user/register|/user/verify|/user/login|/user/resend_verification_mail");
//    }
//
//    public static MvcRequestMatcher swagger() {
//        return new MvcRequestMatcher(handlerMappingIntrospector,
//                "/v2/api-docs|/v3/api-docs|/v3/api-docs/**|/swagger-resources|"+
//                "/swagger-resources/**|/configuration/ui|/configuration/security|/swagger-ui/**|"+
//                "/webjars/**|/swagger-ui.html"
//        );
//    }
}