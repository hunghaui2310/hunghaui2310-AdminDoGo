package com.doan.admin.repo;

import com.doan.admin.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long>, ProductRepoCustom {

    List<Product> findAllByOrderByIdDesc();
}
