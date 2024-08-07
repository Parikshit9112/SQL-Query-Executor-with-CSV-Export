package com.module_data.repository;

import java.util.List;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DataRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public List<Map<String, Object>> findAllData(String query) {
    		return jdbcTemplate.queryForList(query);
    }
}