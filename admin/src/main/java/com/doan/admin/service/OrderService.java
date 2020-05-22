package com.doan.admin.service;

import com.doan.admin.dto.OrderDTO;

public interface OrderService {

    String saveOrder(OrderDTO order) throws Exception;
}
