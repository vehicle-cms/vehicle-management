package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.MaintenanceDao;
import com.app.dao.PartDao;
import com.app.dao.VehicleDao;
import com.app.dto.MaintenanceDTO;
import com.app.dto.PartDTO;
import com.app.entities.Maintenance;
import com.app.entities.Part;

@Service
@Transactional
public class MaintenanceServiceImpl implements MaintenanceService {

	
	@Autowired
    MaintenanceDao maintenanceDao;
	
	 @Autowired
	 private ModelMapper mapper;
	 
	 @Autowired
	 private PartDao pDao;
	 
	 @Autowired VehicleDao vDao;
	
	@Override
	public List<MaintenanceDTO> getAllMaintenance() {
		
		return maintenanceDao.findAll().stream()
                .map(maintenance -> mapper.map(maintenance, MaintenanceDTO.class))
                .collect(Collectors.toList());
	}

	@Override
	public MaintenanceDTO findByMaintenanceId(@NotNull Long maintenanceId) {
	
		 return mapper.map(maintenanceDao.getMaintenanceAndPartsById(maintenanceId)
                .orElseThrow(() -> new ResourceNotFoundException("invalid maintenance id")), MaintenanceDTO.class);
	}

	@Override	
	public MaintenanceDTO createMaintenance(MaintenanceDTO maintenanceDTO) {
	
		Maintenance mntnc=mapper.map(maintenanceDTO, Maintenance.class);
		mntnc.setParts(new ArrayList<Part>());
		mntnc.setVehicle(vDao.getReferenceById(maintenanceDTO.getVehicle().getId()));
		
		for(PartDTO part:maintenanceDTO.getParts())
		{
			Part p=pDao.getReferenceById(part.getId());
			mntnc.addPart(p);
		}
	
		return mapper.map(maintenanceDao.save(mntnc), MaintenanceDTO.class);
	}

//	@Override
//	public MaintenanceDTO updateMaintenance(Long maintenanceId, MaintenanceDTO detachedMaintenance) {
//		if (maintenanceDao.existsById(maintenanceId)) {
//			
//			Maintenance mntnc = maintenanceDao.findById(maintenanceId).orElseThrow(()-> new ResourceNotFoundException("invalid maintenance id"));
//			mntnc.setEndDate(detachedMaintenance.getEndDate());
//			mntnc.setStatus(detachedMaintenance.isStatus());
//			detachedMaintenance.setId(maintenanceId);
//            return mapper.map(maintenanceDao.save(mntnc), MaintenanceDTO.class);
//        }
//        throw new ResourceNotFoundException("invalid maintenance id");
//	}

	

	@Override
	public MaintenanceDTO updateAddMaintenance(Long maintenanceId, MaintenanceDTO detachedMaintenance) {
		if (maintenanceDao.existsById(maintenanceId)) {
			
			Maintenance mntnc = maintenanceDao.findById(maintenanceId).orElseThrow(()-> new ResourceNotFoundException("invalid maintenance id"));
			mntnc.setEndDate(detachedMaintenance.getEndDate());
			mntnc.setStatus(detachedMaintenance.isStatus());
			detachedMaintenance.setId(maintenanceId);
		
			for(PartDTO part:detachedMaintenance.getParts())
			{
				mntnc.addPart(pDao.getReferenceById(part.getId()));
			}
			
            return mapper.map(maintenanceDao.save(mntnc), MaintenanceDTO.class);
        }
        throw new ResourceNotFoundException("invalid maintenance id");
	}

	@Override
	public MaintenanceDTO updateRemoveMaintenance(Long maintenanceId, MaintenanceDTO detachedMaintenance) {
		if (maintenanceDao.existsById(maintenanceId)) {
			
			Maintenance mntnc = maintenanceDao.findById(maintenanceId).orElseThrow(()-> new ResourceNotFoundException("invalid maintenance id"));
			mntnc.setEndDate(detachedMaintenance.getEndDate());
			mntnc.setStatus(detachedMaintenance.isStatus());
			detachedMaintenance.setId(maintenanceId);
		
			for(PartDTO part:detachedMaintenance.getParts())
			{
				mntnc.removePart(pDao.getReferenceById(part.getId()));
			}
			
            return mapper.map(maintenanceDao.save(mntnc), MaintenanceDTO.class);
        }
        throw new ResourceNotFoundException("invalid maintenance id");
	}
	
	
	@Override
	public String deleteMaintenance(Long maintenanceId) {
		 if (maintenanceDao.existsById(maintenanceId)) {
			 maintenanceDao.deleteById(maintenanceId);
	            return "Order deleted.";
	        }
	        return "Deletion of order failed.";
	}

	@Override
	public List<MaintenanceDTO> getAllMaintenancePaginated(int pageNumber, int pageSize) {
		PageRequest pageRequest = PageRequest.of(pageNumber - 1, pageSize);
        Page<MaintenanceDTO> orderPage = maintenanceDao.findAllProjectedBy(pageRequest);
        return orderPage.getContent();
	}

	

}