package com.project.supermarket.service;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.project.supermarket.entity.Product;
import com.project.supermarket.repository.ProductRepository;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public String addProduct(Product product, MultipartFile file) throws IOException {
        byte[] imageData = file.getBytes();
        product.setImage(imageData);
        productRepository.save(product);
        return "Product added successfully";
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
