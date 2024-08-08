package com.module_data.DataController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.module_data.DataService.DataService;

@RestController
@CrossOrigin
@RequestMapping("/api/data")
public class DataController {

    @Autowired
    private DataService dataService;

    @PostMapping("/getAll")
    public ResponseEntity<?> getData(@RequestBody String query, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String str = "";
        try {
            List<Map<String, Object>> list = dataService.getDataWithPagination(query, page, size);
            str = gson.toJson(list);
            
            int totalCount = dataService.getTotalCount("SELECT COUNT(*) FROM (" + query + ") AS countQuery");
            Map<String, Object> response = new HashMap<>();
            response.put("data", list);
            response.put("totalItems", totalCount);
            response.put("totalPages", (int) Math.ceil((double) totalCount / size));
            response.put("currentPage", page);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}