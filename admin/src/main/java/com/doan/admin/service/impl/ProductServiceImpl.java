package com.doan.admin.service.impl;

import com.doan.admin.dto.ProductDTO;
import com.doan.admin.helper.Contains;
import com.doan.admin.helper.DataUtil;
import com.doan.admin.model.FileInfo;
import com.doan.admin.model.Product;
import com.doan.admin.repo.FileInfoRepo;
import com.doan.admin.repo.ProductRepo;
import com.doan.admin.service.ProductService;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import javax.xml.crypto.Data;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

/*
 *   author: HungNN
 */

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private FileInfoRepo fileInfoRepo;

    @Value("${server.tomcat.base.img}")
    private String mstrUploadPath;

    @Override
    public List<ProductDTO> listProductAdmin() throws Exception {
        List<Product> list = productRepo.findAllByOrderByIdDesc();
        List<ProductDTO> productDTOList = new ArrayList<>();
        for(Product product : list) {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(product.getId());
            productDTO.setCategoryId(product.getCategoryId());
            productDTO.setDescription(product.getDescription());
            productDTO.setCodeDiscount(product.getCodeDiscount());
            productDTO.setProductName(product.getProductName());
            productDTO.setDiscount(product.getDiscount());
            productDTO.setNumLike(product.getNumLike());
            productDTO.setNumBuy(product.getNumBuy());
            productDTO.setPrice(product.getPrice());
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
            productDTO.setCreateDate(simpleDateFormat.format(product.getCreateDate()));
            productDTOList.add(productDTO);
        }
        return productDTOList;
    }

    @Override
    public List<ProductDTO> searchProduct(ProductDTO productDTO) throws Exception {
        List<Object[]> list = productRepo.searchProduct(productDTO);
        List<ProductDTO> productDTOList = new ArrayList<>();
        for(Object[] obj : list) {
            ProductDTO productDTO1 = new ProductDTO();
            productDTO1.setId(DataUtil.safeToLong(obj[0]));
            productDTO1.setCategoryId(DataUtil.safeToLong(obj[1]));
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
            Date date = (Date) obj[2];
            productDTO1.setCreateDate(simpleDateFormat.format(date));
            productDTO1.setDescription(DataUtil.safeToString(obj[3]));
            productDTO1.setDiscount(DataUtil.safeToInt(obj[4]));
            productDTO1.setNumLike(DataUtil.safeToLong(obj[5]));
            productDTO1.setPrice(DataUtil.safeToInt(obj[6]));
            productDTO1.setProductName(DataUtil.safeToString(obj[7]));
            productDTO1.setNumBuy(DataUtil.safeToInt(obj[9]));
            productDTO1.setCodeDiscount(DataUtil.safeToString(obj[10]));
            productDTOList.add(productDTO1);
        }
        return productDTOList;
    }

    @Override
    public String deleteProduct(Long productId) throws Exception {
        List<FileInfo> fileInfos = fileInfoRepo.findAllByProductId(productId);
        for (FileInfo fileInfo : fileInfos) {
            fileInfoRepo.deleteById(fileInfo.getId());
        }
        productRepo.deleteById(productId);
        String message = Contains.SUCCESS;
        return message;
    }

    @Override
    public String insertProduct(ProductDTO productDTO) throws Exception {
        String message;
        String urlName = productDTO.getUrlImage();
        Long categoryId = productDTO.getCategoryId();
        String[] split = urlName.split("\\.");
        if (!DataUtil.isNullOrEmpty(productDTO.getBigFile())) {
            String bigFile = productDTO.getBigFile();
            byte[] bytes = Base64.getMimeDecoder().decode(bigFile.split(",")[1]);
            ByteArrayInputStream bos = new ByteArrayInputStream(bytes);
            BufferedImage image = ImageIO.read(bos);
            ImageIO.write(image, split[1], new File(Contains.URL_FILE_PC + Contains.LARGE_SIZE + categoryId + "\\" + urlName));
        }
        if (!DataUtil.isNullOrEmpty(productDTO.getSmallFile())) {
            String smallFile = productDTO.getSmallFile();
            byte[] smallByte = Base64.getMimeDecoder().decode(smallFile.split(",")[1]);
            ByteArrayInputStream bis = new ByteArrayInputStream(smallByte);
            BufferedImage image = ImageIO.read(bis);
            ImageIO.write(image, split[1], new File(Contains.URL_FILE_PC + Contains.SMALL_SIZE + categoryId + "\\" + urlName));
        }

        Product product = new Product();
        product.setCategoryId(productDTO.getCategoryId());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String s = simpleDateFormat.format(new Date());
        Date date = simpleDateFormat.parse(s);
        product.setCreateDate(date);
        product.setDescription(productDTO.getDescription());
        if (!DataUtil.isNullOrZero(productDTO.getDiscount())) {
            product.setDiscount(productDTO.getDiscount());
        }
        product.setPrice(productDTO.getPrice());
        product.setProductName(productDTO.getProductName());
        product.setIsNew(1);
        if (!DataUtil.isNullOrEmpty(productDTO.getCodeDiscount())) {
            product.setCodeDiscount(productDTO.getCodeDiscount());
        }
        Product productNew = productRepo.save(product);
        Long productId = productNew.getId();
        FileInfo fileInfo = new FileInfo();
        fileInfo.setProductId(productId);
        fileInfo.setUrl(urlName);
        fileInfo.setCategoryId(categoryId);
        if (productDTO.getBigFile() != null) {
            fileInfo.setFileTypeId(Long.valueOf(1)); // big file
        }
        fileInfoRepo.save(fileInfo);
        FileInfo info = new FileInfo();
        info.setUrl(urlName);
        info.setProductId(productId);
        info.setCategoryId(categoryId);
        info.setFileTypeId(Long.valueOf(2)); // small file
        fileInfoRepo.save(info);
        message = Contains.SUCCESS;
        return message;
    }
}
