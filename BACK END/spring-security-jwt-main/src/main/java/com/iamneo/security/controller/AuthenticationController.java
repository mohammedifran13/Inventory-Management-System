
package com.iamneo.security.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.security.dto.request.AuthenticationRequest;
import com.iamneo.security.dto.request.RegisterRequest;
import com.iamneo.security.dto.response.AuthenticationResponse;
import com.iamneo.security.dto.response.ErrorResponse;
import com.iamneo.security.entity.User;
import com.iamneo.security.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @GetMapping("/email-exists")
    public ResponseEntity<?> checkEmailExists(@RequestParam("email") String email) {
        boolean emailExists = authenticationService.isEmailExists(email);
        System.out.println("Checking email existence for: " + email);
        if (emailExists) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Email already exists"));
        }
        return ResponseEntity.ok().build();
    }


    @GetMapping("/mobile-number-exists")
    public ResponseEntity<?> checkMobileNumberExists(@RequestParam("mobileNumber") Long mobileNumber) {
        boolean mobileNumberExists = authenticationService.isMobileNumberExists(mobileNumber);
        return ResponseEntity.ok().body(Map.of("exists", mobileNumberExists));
    }
    
    @GetMapping("/email")
    public List<User> getFullDetails(){
    	return authenticationService.getDetails();
    }
}
