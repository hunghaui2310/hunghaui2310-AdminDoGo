package com.doan.admin.repo;

import com.doan.admin.dto.ProductDTO;

import java.util.List;

public interface ProductRepoCustom {

    List<Object[]> searchProduct(ProductDTO productDTO) throws Exception;
}
