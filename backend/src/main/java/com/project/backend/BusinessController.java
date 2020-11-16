package com.project.backend;

import com.project.backend.bigdata.domain.Sample;
import com.project.backend.domain.Client;
import com.project.backend.domain.Office;
import com.project.backend.services.BusinessService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/business")
@Slf4j
public class BusinessController {

    @Autowired
    BusinessService businessService;

    @GetMapping("/clients")
    public List<Client> getAll(){
        return businessService.getClients();
    }

    @GetMapping("/offices/{clientId}")
    public List<Office> getOffices(@PathVariable String clientId){
        return businessService.getOffices(clientId);
    }


}
