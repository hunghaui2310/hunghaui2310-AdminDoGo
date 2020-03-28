package com.doan.admin.controller;

import com.doan.admin.dto.EmployeeDTO;
import com.doan.admin.helper.ApiResponse;
import com.doan.admin.helper.Contains;
import com.doan.admin.service.impl.FacebookService;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/*
*   author: HungNN
*/

@RestController
@RequestMapping("/facebook")
public class FacebookController {

    @Autowired
    private FacebookService facebookService;

    @GetMapping("/welcome")
    public List<String> welcome() {
        List<String> list = new ArrayList<>();
        list.add(Contains.LOCAL_8080 + "/facebook/genURL");
        list.add(Contains.LOCAL_8080);
        return list;
    }

    @GetMapping("/facebookGenerateUrl")
    public ApiResponse generateURL() {
            try {
                String url = facebookService.generateFacebookURL();
                return ApiResponse.build(HttpServletResponse.SC_OK, true, "", url);
            }catch (Exception e) {
                e.printStackTrace();
                return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
            }
    }
//    public String genUrl() {
//        return facebookService.generateFacebookURL();
//    }

    @GetMapping("/facebook")
    public String generateURL(@RequestParam(defaultValue = "code") String code) {
        return facebookService.accessToken(code);
    }

    @GetMapping("/getUserData/{token}/{field}")
    public ApiResponse getUserData(@PathVariable("token") String accessToken, @PathVariable("field") String field) {
        try {
            field = "id,name,birthday,gender,address,email";
            String data = facebookService.getUserData(accessToken);
            JsonObject jsonObject = new JsonParser().parse(data).getAsJsonObject();
            EmployeeDTO user = new EmployeeDTO();
            user.setFullName(jsonObject.get("name").getAsString());
            user.setBirthday(jsonObject.get("birthday").getAsString());
            if (jsonObject.get("email") != null) {
                user.setEmail(jsonObject.get("email").getAsString());
            }
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", user);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
//    public String getUserData(@PathVariable("token") String accessToken) {
//        return facebookService.getUserData(accessToken);
//    }
}
