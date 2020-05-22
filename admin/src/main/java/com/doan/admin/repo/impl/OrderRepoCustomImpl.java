package com.doan.admin.repo.impl;

import com.doan.admin.model.Order;
import com.doan.admin.repo.OrderRepoCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

public class OrderRepoCustomImpl implements OrderRepoCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Transactional
    @Override
    public void saveOrder(Order order) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("INSERT INTO `order` (address, create_date, email, name_order, note, order_code, payment, phone_number, user_id) VALUES " +
                "(:address, :createDate, :email, :nameOrder, :note, :orderCode, :payment, :phoneNumber, :userId)");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("address", order.getAddress());
        query.setParameter("createDate", order.getCreateDate());
        query.setParameter("email", order.getEmail());
        query.setParameter("nameOrder", order.getNameOrder());
        query.setParameter("note", order.getNote());
        query.setParameter("orderCode", order.getOrderCode());
        query.setParameter("payment", order.getPayment());
        query.setParameter("phoneNumber", order.getPhoneNumber());
        if (order.getUserId() != null) {
            query.setParameter("userId", order.getUserId());
        } else {
            query.setParameter("userId", null);
        }
        query.executeUpdate();
    }
}
