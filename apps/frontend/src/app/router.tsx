import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { Campaigns } from '../pages/campaigns/Campaigns';
import { CampaignDetail } from '../pages/campaigns/CampaignDetail';
import { Contacts } from '../pages/contacts/Contacts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'campaigns',
        children: [
          {
            index: true,
            element: <Campaigns />,
          },
          {
            path: ':id',
            element: <CampaignDetail />,
          },
        ],
      },
      {
        path: 'contacts',
        element: <Contacts />,
      },
    ],
  },
]);