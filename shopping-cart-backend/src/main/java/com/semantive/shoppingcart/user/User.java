package com.semantive.shoppingcart.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("users")
public class User {
    @Id
    @With
    private Integer id;
    private String name;
    private short age;

    public User(String name, short age) {
        this.name = name;
        this.age = age;
    }
}
