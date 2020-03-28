package com.doan.admin.repo;

import com.doan.admin.model.Employee;

public interface EmployeeCustomRepo {

    Object[] getLastRow() throws Exception;

    void updateLastLogin(String email);

    void updateEmployee(Employee employee) throws Exception;

    Employee getByEmailOrPhoneNumber(String text);
}
