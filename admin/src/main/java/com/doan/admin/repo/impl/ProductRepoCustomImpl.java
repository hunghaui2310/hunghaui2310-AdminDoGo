package com.doan.admin.repo.impl;

import com.doan.admin.dto.ProductDTO;
import com.doan.admin.helper.DataUtil;
import com.doan.admin.repo.ProductRepoCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.xml.crypto.Data;
import java.util.HashMap;
import java.util.List;

/*
 *   author: HungNN
 */

public class ProductRepoCustomImpl implements ProductRepoCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Object[]> searchProduct(ProductDTO productDTO) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        HashMap hashMap = new HashMap();
        stringBuilder.append("select * from product");
        stringBuilder.append(sqlAppend(productDTO, hashMap));
        stringBuilder.append(" order by product_id desc");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        hashMap.forEach((k, v) -> {
            query.setParameter(k.toString(), v);
        });
        return query.getResultList();
    }

    StringBuilder sqlAppend(ProductDTO productDTO, HashMap hashMap) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(" where 1 = 1");
        if (!DataUtil.isNullOrEmpty(productDTO.getProductName())) {
            stringBuilder.append(" and LOWER(product_name) like concat('%',CONVERT(LOWER(:productName),BINARY),'%')");
            hashMap.put("productName", productDTO.getProductName());
        }
        if (!DataUtil.isNullOrZero(productDTO.getPriceFrom())) {
            stringBuilder.append(" and price between :from and 200");
            hashMap.put("from", productDTO.getPriceFrom());
        }
        if (!DataUtil.isNullOrZero(productDTO.getPriceTo())) {
            stringBuilder.append(" and price between 0 and :to");
            hashMap.put("to", productDTO.getPriceTo());
        }
        if (!DataUtil.isNullOrZero(productDTO.getPriceTo()) && !DataUtil.isNullOrZero(productDTO.getPriceFrom())) {
            stringBuilder.append(" and price between :from and :to ");
            hashMap.put("from", productDTO.getPriceFrom());
            hashMap.put("to", productDTO.getPriceTo());
        }
        if (!DataUtil.isNullOrZero(productDTO.getCategoryId())) {
            stringBuilder.append(" and category_id = :cateId");
            hashMap.put("cateId", productDTO.getCategoryId());
        }
        return stringBuilder;
    }
}
