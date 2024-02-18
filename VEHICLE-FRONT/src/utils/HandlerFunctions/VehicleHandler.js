import { failureNotifier, successNotifier } from '../notifications';
import api from '../../services/backendApi';
import { GetVehicles } from '../../Actions/VehicleActions';

export const createVehicleHandler = async (
  imageUrl,
   vehicleName,
                  model,
                  vehicleNumber,
                  vehicleType,
                  registration,
                  status,
                  mileage,
                  ratePerDay,
                  fuelType,
                  dispatch) => {
  try {
    const data = await api.post('vehicles/', {
    name: vehicleName,
    imageUrl: imageUrl,
    model: model,
    vehicleNumber: vehicleNumber,
    vehicleType: vehicleType,
    registration: registration,
    status: status,
    mileage: mileage,
    ratePerDay: ratePerDay,
    fuelType: fuelType
});

    successNotifier(data?.data?.message);
    dispatch(GetVehicles());
  } catch (e) {
    failureNotifier('failed to create', e?.response?.data?.message);
  }
};

//deleteVehiclHandler

export const deleteVehicleHandler = async (id,dispatch) => {
  try {
    const data = await api.delete(`vehicles/${id}`);
    successNotifier(data?.data?.message);
    dispatch(GetVehicles());
  } catch (e) {
    failureNotifier('failed to create', e?.response?.data?.message);
  }
};
export const updateVehicleHandler = async (id, imageUrl,
   vehicleName,
                  model,
                  vehicleNumber,
                  vehicleType,
                  registration,
                  status,
                  mileage,
                  ratePerDay,
                  fuelType,
                  dispatch) => {
  try {
    console.log("inside")
    const data = await api.put(`vehicles/${id}`,{
       imageUrl,
   name:vehicleName,
                  model,
                  vehicleNumber,
                  vehicleType,
                  registration,
                  status,
                  mileage,
                  ratePerDay,
                  fuelType,
                  dispatch
    });
    successNotifier(data?.message);
    dispatch(GetVehicles());
  } catch (e) {
    failureNotifier('failed to create', e?.response?.data?.message);
  }
};
