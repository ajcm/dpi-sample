package com.project.backend.bigdata.domain;

import com.project.backend.bigdata.domain.DeviceDpi;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.math.BigDecimal;

/**
 * A  meta model class used to create type safe queries from person
 * information.
 *
 * @author Petri Kainulainen
 */
@StaticMetamodel(DeviceDpi.class)
public class DeviceDpi_ {
    public static volatile SingularAttribute<DeviceDpi, String> client;
    public static volatile SingularAttribute<DeviceDpi, String> office;
    public static volatile SingularAttribute<DeviceDpi, BigDecimal> dpi;
}

