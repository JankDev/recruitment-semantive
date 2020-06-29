package com.semantive.shoppingcart.order;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
public class OrderRoutingConfiguration {

    @Bean
    RouterFunction<ServerResponse> orderRouter(final OrderHandler orderHandler) {
        return route().nest(path("/api/orders").and(accept(MediaType.APPLICATION_JSON)), builder -> {
            builder.POST("/", contentType(MediaType.APPLICATION_JSON), orderHandler::saveOrder);
        }).build();
    }
}
