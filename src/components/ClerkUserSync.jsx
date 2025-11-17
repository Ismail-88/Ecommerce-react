import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

// Add this component to your App.js inside <SignedIn>
const ClerkUserSync = () => {
  const { user, isLoaded } = useUser();
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    const syncUserWithBackend = async () => {
      // Don't sync if already synced or user not loaded
      if (!isLoaded || !user || synced) return;

      try {
        

        const response = await fetch('http://localhost:5000/api/users/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User',
            profileImage: user.imageUrl, 
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          setSynced(true);
        } else {
          console.error(' Sync failed:', data.error);
        }
      } catch (error) {
        console.error(' Error syncing user:', error);
      }
    };

    syncUserWithBackend();
  }, [user, isLoaded, synced]);

  return null;
};

export default ClerkUserSync;