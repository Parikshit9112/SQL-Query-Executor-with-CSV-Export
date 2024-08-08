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

    public List<Map<String, Object>> findDataWithPagination(String query, int page, int size) {
        int offset = (page - 1) * size;
        int check=query.indexOf("LIMIT");
        if(check==-1)
           check=query.indexOf("limit");
        if(check!=-1) {
        	 return jdbcTemplate.queryForList(query);
        }
        String paginatedQuery = query + " LIMIT " + size + " OFFSET " + offset;
        return jdbcTemplate.queryForList(paginatedQuery);
    }

    public int getTotalCount(String countQuery) {
        return jdbcTemplate.queryForObject(countQuery, Integer.class);
    }
}