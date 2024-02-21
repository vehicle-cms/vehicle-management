package com.app.service;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.app.dto.MaintenanceDTO;
import com.app.dto.PartDTO;
import com.app.entities.Part;

public interface MaintenanceService {

	List<MaintenanceDTO> getAllMaintenance();

	MaintenanceDTO findByMaintenanceId(@NotNull Long maintenanceId);

	MaintenanceDTO createMaintenance(MaintenanceDTO maintenance);

//	MaintenanceDTO updateMaintenance(Long id, MaintenanceDTO detachedMaintenance);

	String deleteMaintenance(Long id);

	List<MaintenanceDTO> getAllMaintenancePaginated(int pageNumber, int pageSize);

	MaintenanceDTO updateAddMaintenance(Long maintenanceId, MaintenanceDTO detachedMaintenance);

	MaintenanceDTO updateRemoveMaintenance(Long maintenanceId, MaintenanceDTO detachedMaintenance);

	List<PartDTO> getAllParts();

}
