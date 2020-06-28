package com.semantive.shoppingcart.product;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor
@Table("products")
@EqualsAndHashCode(exclude = {"id", "available"})
public class Product {
    @Id
    private Integer id;
    private String color;
    private String size;
    private int available;

    public Product(String color, String size, int available) {
        this.color = color;
        this.size = size;
        this.available = available;
    }
}
