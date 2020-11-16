package com.project.backend;

import com.project.backend.bigdata.domain.DeviceDpi;

import com.project.backend.bigdata.domain.DeviceDpi_;
import org.springframework.data.jpa.domain.Specification;

public class Sepcs {

//    public static Specification<DeviceDpi> isTest() {
//        return (root, query, cb) -> {
//            return cb.equal(root.get(DeviceDpi_.client), 1);
//            criteriaBuilder.equal(root.get(Person_.name), name);
//        };
//    }

    public static Specification<DeviceDpi> client(String name) {
        return (root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.equal(root.get(DeviceDpi_.client), name);
    }

}
