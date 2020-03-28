package com.doan.admin.controller;

import com.doan.admin.dto.ProductDTO;
import com.doan.admin.helper.ApiResponse;
import com.doan.admin.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/*
 *   author: HungNN
 */

@RestController
@RequestMapping("${api_base_path}/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/getProduct")
    public ApiResponse getAllProduct() throws Exception {
        try {
            List<ProductDTO> list = productService.listProductAdmin();
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", list);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/search")
    public ApiResponse searchProAdmin(@RequestBody ProductDTO productDTO) throws Exception {
        try {
            List<ProductDTO> list = productService.searchProduct(productDTO);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", list);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/delete")
    public ApiResponse deleteProduct(@RequestBody ProductDTO productDTO) throws Exception{
        try {
            Long id = productDTO.getId();
            String message = productService.deleteProduct(id);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", message);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/save")
    public ApiResponse saveProduct(@RequestBody ProductDTO productDTO) {
        try {
            String message = productService.insertProduct(productDTO);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", message);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
