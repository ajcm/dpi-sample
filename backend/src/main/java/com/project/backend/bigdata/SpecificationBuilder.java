package com.project.backend.bigdata;

import com.project.backend.bigdata.domain.DeviceDpi;
import com.project.backend.bigdata.domain.DeviceDpi_;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;


@Slf4j
public class SpecificationBuilder {

    public static Specification<DeviceDpi> getSearchQuery(String clientId, String officeId, String from, String to) {
        return (Specification<DeviceDpi>) (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.isNotBlank(clientId)) {
                predicates.add(criteriaBuilder.equal(root.get(DeviceDpi_.client), clientId));
            }

            if (StringUtils.isNotBlank(clientId) && StringUtils.isNotBlank(officeId) ) {
                predicates.add(criteriaBuilder.equal(root.get(DeviceDpi_.office), officeId));
            }


            if (StringUtils.isNotBlank(from) && StringUtils.isNumeric(from)) {

                try {
                    Number ff = NumberFormat.getInstance().parse(from);
                    predicates.add(criteriaBuilder.ge(root.get(DeviceDpi_.dpi),ff));
                } catch (ParseException e) {
                   log.info("Error conversion",e);
                }
            }

            if (StringUtils.isNotBlank(to) && StringUtils.isNumeric(to)) {

                try {
                    Number tt = NumberFormat.getInstance().parse(to);
                    predicates.add(criteriaBuilder.le(root.get(DeviceDpi_.dpi),tt));
                } catch (ParseException e) {
                    log.info("Error conversion",e);
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
    }

}
