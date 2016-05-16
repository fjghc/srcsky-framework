package com.srcskyframework.framework;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Created by xiaojiang on 2016-01-04.
 */
@SpringBootApplication(scanBasePackages = {"com.srcsky"})
public class Startup {
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(Startup.class);
        app.run(args);
    }
}
