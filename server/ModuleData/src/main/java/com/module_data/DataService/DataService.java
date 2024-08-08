package com.module_data.DataService;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.module_data.repository.DataRepository;

@Service
public class DataService {

    @Autowired
    private DataRepository dataRepository;

    public List<Map<String, Object>> getDataWithPagination(String query, int page, int size) throws Exception, SQLException {
        try {
            return dataRepository.findDataWithPagination(query, page, size);
        } catch (Exception e) {
            System.out.println(e);
            throw new Exception("" + e.getCause(), e);
        }
    }

    public int getTotalCount(String countQuery) throws Exception, SQLException {
        try {
            return dataRepository.getTotalCount(countQuery);
        } catch (Exception e) {
            System.out.println(e);
            throw new Exception("" + e.getCause(), e);
        }
    }
}