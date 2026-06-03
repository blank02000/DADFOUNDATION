/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FirebaseProvider } from './components/FirebaseProvider';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ProgramsView } from './components/ProgramsView';
import { SuccessStoriesView } from './components/SuccessStoriesView';
import { VolunteerView } from './components/VolunteerView';
import { BlogView } from './components/BlogView';
import { GalleryView } from './components/GalleryView';
import { ContactView } from './components/ContactView';
import { PrivacyTermsView } from './components/PrivacyTermsView';
import { DonationView } from './components/DonationView';
import { EventsView } from './components/EventsView';
import { AdminDashboardView } from './components/AdminDashboardView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <HomeView setCurrentTab={setCurrentTab} />;
      case 'about':
        return <AboutView setCurrentTab={setCurrentTab} />;
      case 'programs':
        return <ProgramsView setCurrentTab={setCurrentTab} />;
      case 'impact':
        return (
          <div className="space-y-16">
            <SuccessStoriesView />
            <GalleryView />
          </div>
        );
      case 'volunteer':
        return (
          <div className="space-y-16">
            <VolunteerView />
            <EventsView />
          </div>
        );
      case 'resources':
        return <BlogView />;
      case 'contact':
        return <ContactView />;
      case 'privacy':
        return <PrivacyTermsView />;
      case 'donation':
        return <DonationView />;
      case 'admin':
        return <AdminDashboardView />;
      default:
        return <HomeView setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <FirebaseProvider>
      <div className="min-h-screen flex flex-col justify-between font-sans selection:bg-[#1B7330]/20 selection:text-[#0A2240]">
        {/* Navigation Headings */}
        <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {/* Dynamic page layers */}
        <main className="flex-grow">
          {renderContent()}
        </main>

        {/* Corporate footer details */}
        <Footer setCurrentTab={setCurrentTab} />
      </div>
    </FirebaseProvider>
  );
}
