package com.project.backend.bigdata.repository;

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

    /**
     * TODO: issue when comparing to and from with decimals.
     * @param clientId
     * @param officeId
     * @param deviceId
     * @param from
     * @param to
     * @return
     */
    public static Specification<DeviceDpi> getSearchQuery(String clientId, String officeId,String deviceId, String from, String to) {
        return (Specification<DeviceDpi>) (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.isNotBlank(clientId)) {
                predicates.add(criteriaBuilder.equal(root.get(DeviceDpi_.client), clientId));
            }

            if (StringUtils.isNotBlank(clientId) && StringUtils.isNotBlank(officeId) ) {
                predicates.add(criteriaBuilder.equal(root.get(DeviceDpi_.office), officeId));
            }

            if (StringUtils.isNotBlank(deviceId) && StringUtils.isNotBlank(deviceId) ) {
                predicates.add(criteriaBuilder.like(root.get(DeviceDpi_.device), "%"+deviceId+"%"));
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
