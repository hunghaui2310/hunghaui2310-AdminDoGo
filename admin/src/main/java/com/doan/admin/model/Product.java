package com.doan.admin.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "product")
public class Product {

    private Long id;
    private Long categoryId;
    private Date createDate;
    private String description;
    private int discount;
    private Long numLike;
    private int price;
    private String productName;
    private int isNew;
    private int numBuy;
    private String codeDiscount;

    @Id
    @GeneratedValue
    @Column(name = "product_id", nullable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "product_name")
    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    @Column(name = "price")
    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Column(name = "des")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "create_date")
    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    @Column(name = "num_like")
    public Long getNumLike() {
        return numLike;
    }

    public void setNumLike(Long numLike) {
        this.numLike = numLike;
    }

    @Column(name = "category_id")
    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    @Column(name = "discount")
    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    @Column(name = "is_new")
    public int getIsNew() {
        return isNew;
    }

    public void setIsNew(int isNew) {
        this.isNew = isNew;
    }

    @Column(name = "num_buy")
    public int getNumBuy() {
        return numBuy;
    }

    public void setNumBuy(int numBuy) {
        this.numBuy = numBuy;
    }

    @Column(name = "code_discount")
    public String getCodeDiscount() {
        return codeDiscount;
    }

    public void setCodeDiscount(String codeDiscount) {
        this.codeDiscount = codeDiscount;
    }
}
