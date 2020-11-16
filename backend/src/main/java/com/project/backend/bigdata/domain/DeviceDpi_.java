package com.project.backend.bigdata.domain;

import com.project.backend.bigdata.domain.DeviceDpi;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * A  meta model class used to create type safe queries from person
 * information.
 *
 * @author Petri Kainulainen
 */
@StaticMetamodel(DeviceDpi.class)
public class DeviceDpi_ {
    public static volatile SingularAttribute<DeviceDpi, String> client;
}
