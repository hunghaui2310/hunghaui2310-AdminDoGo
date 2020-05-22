package com.doan.admin.service.impl;

import com.doan.admin.dto.OrderDTO;
import com.doan.admin.helper.Contains;
import com.doan.admin.model.Order;
import com.doan.admin.repo.OrderRepo;
import com.doan.admin.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepo orderRepo;

    @Override
    public String saveOrder(OrderDTO order) throws Exception {
        String message;
        if (order != null) {
            Order orderModel = new Order();
            SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            orderModel.setNote(order.getNote());
            orderModel.setNameOrder(order.getLastName() + " " + order.getFirstName());
            orderModel.setEmail(order.getEmail());
            orderModel.setPhoneNumber(order.getPhoneNumber());
            orderModel.setAddress(order.getAddress());
            orderModel.setPayment(0);
            orderModel.setOrderCode(order.getOrderCode());
            String dateString = date.format(new Date());
            Date setDate = date.parse(dateString);
            orderModel.setCreateDate(setDate);
            orderRepo.saveOrder(orderModel);
            message = Contains.SUCCESS;
        } else {
            message = Contains.ERROR;
        }
        return message;
    }
}
