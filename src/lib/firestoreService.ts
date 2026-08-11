import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase';
import { PackageData, ShipSchedule } from '../types';
import { INITIAL_PACKAGES, INITIAL_SCHEDULES } from '../data/initialData';

const PACKAGES_COLLECTION = 'packages';
const SCHEDULES_COLLECTION = 'schedules';

// Initialize/Seed Firestore if collections are empty
export async function seedInitialDataIfNeeded() {
  try {
    const packagesSnap = await getDocs(collection(db, PACKAGES_COLLECTION));
    if (packagesSnap.empty) {
      const batch = writeBatch(db);
      INITIAL_PACKAGES.forEach((pkg) => {
        const ref = doc(db, PACKAGES_COLLECTION, pkg.resi);
        batch.set(ref, pkg);
      });
      await batch.commit();
      console.log('Seeded initial packages to Firestore');
    }

    const schedulesSnap = await getDocs(collection(db, SCHEDULES_COLLECTION));
    if (schedulesSnap.empty) {
      const batch = writeBatch(db);
      INITIAL_SCHEDULES.forEach((sched) => {
        const ref = doc(db, SCHEDULES_COLLECTION, sched.id);
        batch.set(ref, sched);
      });
      await batch.commit();
      console.log('Seeded initial schedules to Firestore');
    }
  } catch (err) {
    console.error('Error seeding initial data:', err);
  }
}

// Real-time listener for Packages
export function subscribeToPackages(onUpdate: (packages: PackageData[]) => void) {
  const q = collection(db, PACKAGES_COLLECTION);
  return onSnapshot(
    q,
    (snapshot) => {
      const list: PackageData[] = [];
      snapshot.forEach((docSnap) => {
        list.push(docSnap.data() as PackageData);
      });
      // Sort newest created first if possible
      list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      onUpdate(list);
    },
    (error) => {
      console.error('Firestore packages snapshot error:', error);
    }
  );
}

// Real-time listener for Schedules
export function subscribeToSchedules(onUpdate: (schedules: ShipSchedule[]) => void) {
  const q = collection(db, SCHEDULES_COLLECTION);
  return onSnapshot(
    q,
    (snapshot) => {
      const list: ShipSchedule[] = [];
      snapshot.forEach((docSnap) => {
        list.push(docSnap.data() as ShipSchedule);
      });
      onUpdate(list);
    },
    (error) => {
      console.error('Firestore schedules snapshot error:', error);
    }
  );
}

// Save or Add Package
export async function dbAddPackage(pkg: PackageData) {
  try {
    const ref = doc(db, PACKAGES_COLLECTION, pkg.resi);
    await setDoc(ref, pkg);
  } catch (err) {
    console.error('Failed to add package to Firestore:', err);
    throw err;
  }
}

// Update Package Status & History
export async function dbUpdatePackageStatus(
  resi: string,
  newStatus: PackageData['status'],
  newLoc: string,
  currentPackage?: PackageData
) {
  try {
    const ref = doc(db, PACKAGES_COLLECTION, resi);
    if (!currentPackage) return;

    const updatedHistory = [
      ...currentPackage.history,
      {
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        status: newStatus,
        location: newLoc,
        description: `Status diperbarui menjadi: ${newStatus}`,
      },
    ];

    const updatedPackage: PackageData = {
      ...currentPackage,
      status: newStatus,
      currentLocation: newLoc,
      history: updatedHistory,
    };

    await setDoc(ref, updatedPackage, { merge: true });
  } catch (err) {
    console.error('Failed to update package status in Firestore:', err);
    throw err;
  }
}

// Add or Publish Ship Schedule
export async function dbAddSchedule(schedule: ShipSchedule) {
  try {
    const ref = doc(db, SCHEDULES_COLLECTION, schedule.id);
    await setDoc(ref, schedule);
  } catch (err) {
    console.error('Failed to add schedule to Firestore:', err);
    throw err;
  }
}

// Delete Ship Schedule
export async function dbDeleteSchedule(id: string) {
  try {
    const ref = doc(db, SCHEDULES_COLLECTION, id);
    await deleteDoc(ref);
  } catch (err) {
    console.error('Failed to delete schedule from Firestore:', err);
    throw err;
  }
}
