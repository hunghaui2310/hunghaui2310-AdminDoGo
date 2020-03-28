package com.doan.admin.service.impl;

import com.doan.admin.helper.Contains;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.impl.FacebookTemplate;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.social.oauth2.OAuth2Parameters;
import org.springframework.stereotype.Service;

/*
 *   author: HungNN
 */

@Service
public class FacebookService {

    @Value("${face_id}")
    private String appId;

    @Value("${face_key}")
    private String appSecret;

    private String accessToken;

    public FacebookConnectionFactory connectionFactory() {
        return new FacebookConnectionFactory(appId, appSecret);
    }

    public String generateFacebookURL() {
        OAuth2Parameters parameters = new OAuth2Parameters();
        parameters.setRedirectUri(Contains.LOCAL_8080 + "/facebook/facebook");
        parameters.setScope("email");
        return connectionFactory().getOAuthOperations().buildAuthenticateUrl(parameters);
    }

    public String accessToken(String code) {
            accessToken = connectionFactory().getOAuthOperations()
                .exchangeForAccess(code, Contains.LOCAL_8080 + "/facebook/facebook", null).getAccessToken();
        return accessToken;
    }

    public String getUserData(String accessToken) {
        Facebook facebook = new FacebookTemplate(accessToken);
        String[] fields = {"id", "first_name", "name", "email", "birthday", "gender", "age_range"
                , "hometown", "inspirational_people"};
        return facebook.fetchObject("me", String.class, fields);
    }
}
