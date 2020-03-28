package com.doan.admin.service;

import com.doan.admin.dto.ProductDTO;

import java.util.List;

public interface ProductService {

    List<ProductDTO> listProductAdmin() throws Exception;

    List<ProductDTO> searchProduct(ProductDTO productDTO) throws Exception;

    String deleteProduct(Long productId) throws Exception;

    String insertProduct(ProductDTO productDTO) throws Exception;
}
