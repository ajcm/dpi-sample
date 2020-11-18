package com.project.backend;

import com.project.backend.bigdata.DeviceService;
import com.project.backend.bigdata.domain.DeviceDpi;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/devices")
@Slf4j
public class DevicesController {

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

    @PostMapping(path = "/dpi")
    void process() {
        deviceService.processDPI();
    }



}

