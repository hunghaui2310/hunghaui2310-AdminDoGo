package com.doan.admin.controller;

import com.doan.admin.dto.OrderDTO;
import com.doan.admin.helper.ApiResponse;
import com.doan.admin.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/save")
    public ApiResponse saveOrder(@RequestBody OrderDTO order){
        try{
            String message = orderService.saveOrder(order);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, null, message);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
