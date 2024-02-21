package com.app.security;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;

@Component // spring bean : can be injected in other spring beans
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	// token verification
	// dep : JWT utils
	@Autowired
	private JwtUtils utils;
	
	@Autowired
	private CustomUserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// check auth header from incoming request
		String authHeader = request.getHeader("Authorization");
		System.out.println("Authorization"+authHeader);
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			
			String jwt = authHeader.substring(7);// req header contains JWT starts from 7th position
			
			Claims payloadClaims = utils.validateJwtToken(jwt);// validate JWT
			
			String email = utils.getUserNameFromJwtToken(payloadClaims);// get user name from the claims
			
			if(email!=null  && SecurityContextHolder.getContext().getAuthentication()==null) {
				UserDetails userDetails = userDetailsService.loadUserByUsername(email);
				if(utils.isTokenValid(jwt, userDetails)) {
					
					UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
																	email,
																	null,
																	utils.getAuthoritiesFromClaims(payloadClaims));
					token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(token);
				}
				
			}
			
			
			
			
			
			
			
			
			// get granted authorities as a custom claim
			// add username/email n granted authorities in Authentication object
			
			// save this auth token under spring sec so that subsequent filters will NOT
			// retry the auth again
			
			System.out.println("saved auth token in sec ctx");
		}
		filterChain.doFilter(request, response);					// to continue with remaining chain of spring sec filters

	}

}
