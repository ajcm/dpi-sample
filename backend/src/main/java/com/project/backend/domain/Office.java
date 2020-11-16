package com.project.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Slf4j
@ToString
public class Office {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    @JsonIgnore
    private Long id;

    private String clientId;

    private String officeId;

    private String name;

    public Office(String clientId,String officeId, String name){
        this.clientId = clientId;
        this.officeId = officeId;
        this.name = name;
    }

}
