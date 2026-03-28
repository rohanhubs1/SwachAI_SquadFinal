import api from './api';
import type { CollectionRequest } from './requestService';

export const getDriverTasks = async (): Promise<CollectionRequest[]> => {
  const res = await api.get('/driver/tasks');
  return res.data;
};

export const updateTaskStatus = async (
  id: string,
  status: string
): Promise<CollectionRequest> => {
  const res = await api.patch(`/request/${id}/status`, { status });
  return res.data;
};

export const updateDriverShiftStatus = async (shiftStatus: 'Active' | 'Off-duty' | 'On-break'): Promise<void> => {
  await api.patch('/driver/shift', { shiftStatus });
};

export const getMyShiftStatus = async (): Promise<'Active' | 'Off-duty' | 'On-break'> => {
  const res = await api.get('/driver/shift');
  return res.data.shiftStatus;
};

export const getMyDriverMeta = async (): Promise<{ shiftStatus: 'Active' | 'Off-duty' | 'On-break'; truckType: string; currentLocation?: { lat: number; lng: number } }> => {
  const res = await api.get('/driver/shift');
  return { shiftStatus: res.data.shiftStatus, truckType: res.data.truckType || '', currentLocation: res.data.currentLocation };
};

export const updateTruckType = async (truckType: 'Mixed' | 'Biodegradable' | 'Non-biodegradable'): Promise<void> => {
  await api.patch('/driver/truck-type', { truckType });
};

export interface DriverComplaint {
  _id: string;
  userId: string | { _id: string; name: string; email: string };
  description: string;
  location: string;
  lat?: number | null;
  lng?: number | null;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Resolved';
  createdAt: string;
  ai?: { classification?: string; confidence?: number | null };
}

export const getDriverComplaints = async (): Promise<DriverComplaint[]> => {
  const res = await api.get('/driver/complaints');
  return res.data;
};

export const resolveAssignedComplaint = async (complaintId: string, feedback: string = ''): Promise<DriverComplaint> => {
  const res = await api.patch(`/driver/complaint/${complaintId}/resolve`, { feedback });
  return res.data;
};
