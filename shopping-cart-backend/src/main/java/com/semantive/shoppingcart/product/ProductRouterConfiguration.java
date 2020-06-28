package com.semantive.shoppingcart.product;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.accept;
import static org.springframework.web.reactive.function.server.RequestPredicates.path;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
public class ProductRouterConfiguration {

    @Bean
    RouterFunction<ServerResponse> productRouter(final ProductHandler productHandler) {
        return route().nest(path("/api/products").and(accept(MediaType.APPLICATION_JSON)), builder -> {
            builder.GET("/", productHandler::getAllProducts);
        }).build();
    }
}
