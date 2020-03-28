package com.doan.admin.controller;

import com.doan.admin.dto.CommentDTO;
import com.doan.admin.helper.ApiResponse;
import com.doan.admin.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/*
 *   author: HungNN
 */

@RestController
@RequestMapping("${api_base_path}/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/getComment")
    public ApiResponse getSomeNotification() throws Exception {
        try {
            List<CommentDTO> list = commentService.getNotificationAdmin();
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", list);
        } catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
