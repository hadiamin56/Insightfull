import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage } from './components/Homepage'; // Import your Homepage component
import { ContactUs } from './components/ContactUs'; // Import your ContactUs component
import { Industries } from './components/Industries';
import { Reportssubs } from './components/Reportssubs';
import { Consulting } from './components/Consulting';
import { Insights } from './components/Insights';
import { Joinus } from './components/Joinus';
import AdminLogin from "./components/AdminLogin";
import DetailsPage from "./components/DetailsPage";
import UserQueriesPage from "./components/UserQueriesPage";
import PrivateSectorsForm from './components/PrivateSectorsform';
import PrivateSectorDetails from './components/PrivateSectorDetails';
import SliderImagesForm from './components/SliderImagesForm';
import SliderImageDetails from './components/SliderImageDetails';
import UploadResultForm from './components/UploadResultForm';
import Results from './components/Results';
import MultipleImageUploadForm from './components/MultipleImageUploadForm';
import GalleryPage from './components/GalleryPage';
import NotificationForm from './components/NotificationForm';
// import NotificationMarquee from './components/NotificationMarquee';
import StudentLeaderboard from './components/StudentLeaderboard';
import LeaderboardCards from './components/LeaderboardCards';
import ManagementMessages from './components/messagenotification';
import UpNotificationMarquee from './components/UpNotificationMarquee';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/contactus" element={<ContactUs />} /> 
        <Route path="/Industries" element={<Industries />} />
        <Route path="/reportandsubs" element={<Reportssubs />} />
        <Route path="/Consulting" element={<Consulting />} />
        <Route path="/Insights" element={<Insights />} />
        <Route path="/Joinus" element={<Joinus />} />
        <Route path="/Login" element={<AdminLogin />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/queries" element={<UserQueriesPage />} />
        <Route path="/PrivateSectorsform" element={<PrivateSectorsForm/>} />
        <Route path="/PrivateSectorDetails" element={<PrivateSectorDetails/>} />
        <Route path="/SliderImagesForm" element={<SliderImagesForm />} />
        <Route path="/SliderImageDetails" element={<SliderImageDetails />} />
        <Route path="/UploadResultForm" element={<UploadResultForm />} />
        <Route path="/Results" element={<Results />} />
        <Route path="/MultipleImageUploadForm" element={<MultipleImageUploadForm />} />
        <Route path="/ViewGallery" element={<GalleryPage />} />
        <Route path="/NotificationForm" element={<NotificationForm/>} />
        {/* <Route path="/NotificationMarquee" element={<NotificationMarquee/>} /> */}
        <Route path="/Leaderboardform" element={<StudentLeaderboard/>} />
        <Route path="/Leaderboard" element={<LeaderboardCards/>} />
        <Route path="/ManagementMessages" element={<ManagementMessages/>} /> 
        <Route path="/UpNotificationMarquee" element={<UpNotificationMarquee/>} /> 

      </Routes>
    </Router>
  );
}

export default App;
