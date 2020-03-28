package com.doan.admin.dto;

public class ProductDTO {

    private Long id;
    private String productName;
    private int price;
    private Long numLike;
    private int discount;
    private String urlImage;
    private String description;
    private boolean noData;
    private String categoryName;
    private double realPrice;
    private boolean productNew;
    private Long categoryId;
    private Long numProInCart;
    private double total;
    private String codeDiscount;
    private String createDate;
    private int numBuy;
    private int priceFrom;
    private int priceTo;
    private String bigFile;
    private String smallFile;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getNumLike() {
        return numLike;
    }

    public void setNumLike(Long numLike) {
        this.numLike = numLike;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean getNoData() {
        return noData;
    }

    public void setNoData(boolean noData) {
        this.noData = noData;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public double getRealPrice() {
        return realPrice;
    }

    public void setRealPrice(double realPrice) {
        this.realPrice = realPrice;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public boolean isProductNew() {
        return productNew;
    }

    public void setProductNew(boolean productNew) {
        this.productNew = productNew;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getNumProInCart() {
        return numProInCart;
    }

    public void setNumProInCart(Long numProInCart) {
        this.numProInCart = numProInCart;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getCodeDiscount() {
        return codeDiscount;
    }

    public void setCodeDiscount(String codeDiscount) {
        this.codeDiscount = codeDiscount;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public int getNumBuy() {
        return numBuy;
    }

    public void setNumBuy(int numBuy) {
        this.numBuy = numBuy;
    }

    public int getPriceFrom() {
        return priceFrom;
    }

    public void setPriceFrom(int priceFrom) {
        this.priceFrom = priceFrom;
    }

    public int getPriceTo() {
        return priceTo;
    }

    public void setPriceTo(int priceTo) {
        this.priceTo = priceTo;
    }

    public String getBigFile() {
        return bigFile;
    }

    public void setBigFile(String bigFile) {
        this.bigFile = bigFile;
    }

    public String getSmallFile() {
        return smallFile;
    }

    public void setSmallFile(String smallFile) {
        this.smallFile = smallFile;
    }
}
