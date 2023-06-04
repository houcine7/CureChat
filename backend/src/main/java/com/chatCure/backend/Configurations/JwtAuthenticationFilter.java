package com.chatCure.backend.Configurations;

import com.chatCure.backend.Services.JWTsvc.JwtServiceI;
import com.chatCure.backend.Services.Users.UserDetailsImpService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    JwtServiceI jwtServiceI ;

    @Autowired
    UserDetailsService userDetailsService ;

    @Autowired
    UserDetailsImpService userDetailsImpService ;



    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // get authorisation header
        String authorization =request.getHeader("Authorization") ;
        String jwt;
        String id;

        System.out.println(authorization);
        if(authorization==null || !authorization.split(" ")[0].equals("Bearer")){
            System.out.println("..... no auth header");

            filterChain.doFilter(request,response);
            return ;
        }
        jwt =authorization.split(" ")[1];

        id=jwtServiceI.extractId(jwt) ;

        System.out.println("id") ;

        if( id!=null && SecurityContextHolder.getContext().getAuthentication()==null){

            UserDetails userDetails =userDetailsImpService.loadUserById(id) ;

            UsernamePasswordAuthenticationToken authToken =new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        filterChain.doFilter(request,response);
    }
}
