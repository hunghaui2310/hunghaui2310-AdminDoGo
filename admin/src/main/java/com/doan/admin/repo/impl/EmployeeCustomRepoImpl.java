package com.doan.admin.repo.impl;

import com.doan.admin.model.Employee;
import com.doan.admin.repo.EmployeeCustomRepo;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.Date;

/*
 *   author: HungNN
 */

public class EmployeeCustomRepoImpl implements EmployeeCustomRepo {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Object[] getLastRow() throws Exception {
        Query query = entityManager.createNativeQuery("SELECT * FROM employee ORDER BY id desc LIMIT 1");
        return (Object[]) query.getSingleResult();
    }

    @Transactional
    @Override
    public void updateLastLogin(String email) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("UPDATE employee SET last_login = :lastLogin where email = :email or phone_number = :email");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = simpleDateFormat.format(new Date());
        query.setParameter("lastLogin", date);
        query.setParameter("email", email);
        query.executeUpdate();
    }


    @Transactional
    @Override
    public void updateEmployee(Employee employee) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("UPDATE employee SET code = :code, password = :password, first_name = :firstName, last_name = :lastName," +
                "phone_number = :phoneNumber, address = :address, manage_code = :manageCode, salary = :salary WHERE email = :email");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("code", employee.getCode());
        query.setParameter("password", employee.getPassword());
        query.setParameter("firstName", employee.getFirstName());
        query.setParameter("lastName", employee.getLastName());
        query.setParameter("phoneNumber", employee.getPhoneNumber());
        query.setParameter("address", employee.getAddress());
        query.setParameter("manageCode", employee.getManageCode());
        query.setParameter("salary", employee.getSalary());
        query.setParameter("email", employee.getEmail());
        query.executeUpdate();
    }

    @Override
    public Employee getByEmailOrPhoneNumber(String text) {
        StringBuilder sql = new StringBuilder();
        sql.append("select e from Employee e where e.email = :email or phoneNumber = :phoneNumber");
        Query query = entityManager.createQuery(sql.toString());
        query.setParameter("email", text);
        query.setParameter("phoneNumber", text);
        return (Employee) query.getSingleResult();
    }
}
