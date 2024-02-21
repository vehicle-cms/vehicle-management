import { GetPlatforms } from '../../Actions/MaintenanceActions';
import api from '../../services/backendApi';
import { failureNotifier, successNotifier } from '../notifications';

export const createMaintenance = async (
    id,
    parts,
    dispatch
) => {
  try {
    const data = await api.post('/user/maintenance', {
     vehicle:{id:id},
     partsList:parts,
     status:true
    });

    successNotifier(data?.data?.message);
    dispatch(GetPlatforms());
  } catch (e) {
    failureNotifier('failed to create', e?.response?.data?.message);
  }
};

export const UpdateMaintenance = async (id,status,parts,dispatch)=>{
  try {
    const data = await api.put(`/user/maintenance/add-part/${id}`, {
     status,
     partsList:parts
    });

    successNotifier(data?.data?.message);
    dispatch(GetPlatforms());
  } catch (e) {
    failureNotifier('failed to create', e?.response?.data?.message);
  }
}