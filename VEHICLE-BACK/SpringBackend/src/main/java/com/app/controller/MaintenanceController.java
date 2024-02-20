
package com.app.controller;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.MaintenanceDTO;
import com.app.service.MaintenanceService;


@RestController
@RequestMapping("/user/maintenance")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin
public class MaintenanceController {

    @Autowired
    private MaintenanceService maintenanceService;

    @GetMapping
    public List<MaintenanceDTO> listAllMaintenance() {
        
    	return maintenanceService.getAllMaintenance();
    }


    @GetMapping("/{maintenanceId}")
    public MaintenanceDTO getMaintenanceDetails(@PathVariable @NotNull Long maintenanceId) {
        return maintenanceService.findByMaintenanceId(maintenanceId);
    }

    @GetMapping("/paginate")
    public ResponseEntity<?> getAllMaintenancePaginated(
            @RequestParam(defaultValue = "0", required = false) int pageNumber,
            @RequestParam(defaultValue = "10", required = false) int pageSize) {

        List<MaintenanceDTO> maintenancelist = maintenanceService.getAllMaintenancePaginated(pageNumber, pageSize);
        if (maintenancelist.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(maintenancelist);
    }

    @PostMapping
    public MaintenanceDTO createMaintenance(@RequestBody MaintenanceDTO maintenance) {
        return maintenanceService.createMaintenance(maintenance);
    }
    
//    @PutMapping("/{maintenanceId}")
//    public MaintenanceDTO updateMaintenance(@PathVariable Long maintenanceId,@RequestBody MaintenanceDTO detachedMaintenance) {
//        return maintenanceService.updateMaintenance(maintenanceId,detachedMaintenance);
//    }

    @PutMapping("/add-part/{maintenanceId}")
    public MaintenanceDTO updateAddMaintenance(@PathVariable Long maintenanceId,@RequestBody MaintenanceDTO detachedMaintenance) {
        return maintenanceService.updateAddMaintenance(maintenanceId,detachedMaintenance);
    }
    @PutMapping("/remove-part/{maintenanceId}")
    public MaintenanceDTO updateRemoveMaintenance(@PathVariable Long maintenanceId,@RequestBody MaintenanceDTO detachedMaintenance) {
        return maintenanceService.updateRemoveMaintenance(maintenanceId,detachedMaintenance);
    }

    @DeleteMapping("/{maintenanceId}")
    public String deleteMaintenance(@PathVariable Long maintenanceId) {
        return maintenanceService.deleteMaintenance(maintenanceId);
    }
    

}
