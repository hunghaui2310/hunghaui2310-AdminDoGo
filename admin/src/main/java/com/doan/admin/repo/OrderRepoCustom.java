package com.doan.admin.repo;

import com.doan.admin.model.Order;

public interface OrderRepoCustom {

    void saveOrder(Order order) throws Exception;
}
