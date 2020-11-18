package com.project.backend.services;

import com.project.backend.bigdata.repository.DeviceDpiRepository;
import com.project.backend.domain.Client;
import com.project.backend.domain.Office;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusinessService {

    private static String[] CLIENTS = {"WHATEVER","IBM","ONU","VOLVO","HSBC","HP","Compaq","CGD","AIB","XEROX","LaCaixa","BMW","ROLEX","VATICAN","NATO","AIRBUS","BOEING","WALLMART"};

    @Autowired
    DeviceDpiRepository deviceDpiRepository;

    /* OBS: this would be another datasource that contains all the clients and offices details */
    public List<Client> getClients(){
        List<Client> result = new LinkedList<>();
        List<String>  clients = deviceDpiRepository.findAllClients();

        if (!CollectionUtils.isEmpty(clients)) {
            result = clients.stream().map(c -> new Client(c,getClientName(c))).collect(Collectors.toList());
        }

        return result;
    }

    public List<Office> getOffices(String clientId){
        /** TODO: check if client exists */

        List<Office> result = new LinkedList<>();
        List<String> offices = deviceDpiRepository.findOffices(clientId);

        if (!CollectionUtils.isEmpty(offices)) {
            result = offices.stream().map(o -> new Office(clientId,o,"L"+o)).collect(Collectors.toList());
        }

        return result;
    }


    /* Aux */
    private static String getClientName(String c) {
        int index = NumberUtils.toInt(c,0);
        return CLIENTS[index % CLIENTS.length];
    }


}
