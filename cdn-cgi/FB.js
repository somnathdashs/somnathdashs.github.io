// FB.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
{/* <script src="https://www.gstatic.com/firebasejs/9.1.0/firebase-storage.js"></script> */ }

// Your web app's Firebase configuration
const firebaseConfig = {
  // Firebase configuration
  apiKey: "AIzaSyBR4fbDmBVs5pUdK24fkfR8CPSWc8chd1g",
  authDomain: "my-portfolio-51150.firebaseapp.com",
  databaseURL: "https://my-portfolio-51150-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-portfolio-51150",
  storageBucket: "my-portfolio-51150.appspot.com",
  messagingSenderId: "983424656299",
  appId: "1:983424656299:web:25cf6ab30ea14378e568ee",
  measurementId: "G-S81C715WT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export const storage = getStorage(app);

// Reference Paths
export const profileRef = ref(db, '/Profile/');
export const appsRef = ref(db, '/Apps/');
export const projectsRef = ref(db, '/Projects/');

export function Get_A_Project_Data(pid, calback) {
  onValue(ref(db, '/Projects/' + pid), (snapshot) => {
    const ProjectData = snapshot.val();
    calback(ProjectData);
  })
}


export function Get_A_App_Data(pid, calback) {
  onValue(ref(db, '/Apps/' + pid), (snapshot) => {
    const ProjectData = snapshot.val();
    calback(ProjectData);
  })
}



// Function to save project data in Firebase Realtime Database
export function saveProjectData(data) {
  const newProjectRef = ref(db, "/Projects/" + "id_" + Math.random().toString(18).slice(2));
  return set(newProjectRef, data);
}

export function updateProjectData(id, data) {
  const newProjectRef = ref(db, "/Projects/" + id);
  return set(newProjectRef, data);
}

export function searchProjects(keyword) {
  const projectsQuery = query(projectsRef, orderByChild('Search'), equalTo(keyword));
  return projectsQuery;
}

// Function to save project data in Firebase Realtime Database
export function saveAppsData(data) {
  const newAppsRef = ref(db, "/Apps/" + "id_" + Math.random().toString(18).slice(2));
  return set(newAppsRef, data);
}

export function updateAppsData(id, data) {
  const newAppsRef = ref(db, "/Apps/" + id);
  return set(newAppsRef, data);
}

export function searchApps(keyword) {
  const AppssQuery = query(appsRef, orderByChild('Search'), equalTo(keyword));
  return AppssQuery;
}

export function add3Dots(string, limit) {
  var dots = "....";
  if (string.length > limit) {
    // you can also use substr instead of substring
    string = string.substring(0, limit) + dots;
  }

  return string;
}


export function Bios(what,calback) {
  onValue(ref(db, '/Bios/' + what), (snapshot) => {
    const AboutData = snapshot.val();
    calback(AboutData);
  })
}

export function Update_Bios(what,data) {
  const newProjectRef = ref(db, "/Bios/" + what);
  return set(newProjectRef, data);
}



// Optionally export the 'onValue' function if you want to use it directly
export { onValue };
