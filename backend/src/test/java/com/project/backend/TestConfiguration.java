package com.project.backend;

import com.project.backend.bigdata.DataService;
import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class TestConfiguration {

    @Bean
    @Primary
    public DataService nameService() {
        return Mockito.mock(DataService.class);
    }




}
