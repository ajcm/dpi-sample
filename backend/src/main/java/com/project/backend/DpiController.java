package com.project.backend;

import com.project.backend.bigdata.DeviceService;
import com.project.backend.bigdata.domain.DeviceDpi;
import com.project.backend.bigdata.domain.Sample;
import com.project.backend.domain.Client;
import com.project.backend.domain.Device;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/devices")
@Slf4j
public class DpiController {

    @Autowired
    DeviceService deviceService;

    @GetMapping(path = "/dpi")
    Page<DeviceDpi> findAllPage(@PageableDefault(page = 0, size = 20)
                    Pageable pageable,
                                @RequestParam(required = false) String clientId,
                                @RequestParam(required = false) String officeId,
                                @RequestParam(required = false) String from,
                                @RequestParam(required = false) String to) {

        return deviceService.find(clientId,officeId,from,to,pageable);
    }

    @GetMapping(path = "/dpi/devices")
    List<Device> findDevices(@PageableDefault(page = 0, size = 20)
                                        Pageable pageable,
                             @RequestParam(required = false) String clientId,
                             @RequestParam(required = false) String officeId,
                             @RequestParam(required = false) String from,
                             @RequestParam(required = false) String to) {

        List<Device> result = new LinkedList<>();

        List<String> devices = deviceService.findDevices();

        if (!CollectionUtils.isEmpty(devices)) {
            result = devices.stream().map(c -> new Device(c,c)).collect(Collectors.toList());
        }

        return result;
    }

    @PostMapping(path = "/dpi")
    void process() {
        deviceService.processDPI();
    }



}

