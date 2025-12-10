import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import DashboardLayout from '@/components/layout/DashboardLayout'

// Pages
import Dashboard from '@/pages/Dashboard'
import UserList from '@/pages/Users/UserList'
import UserDetails from '@/pages/Users/UserDetails'
import ProductList from '@/pages/Products/ProductList'
import CategoryList from '@/pages/Categories/CategoryList'
import ProfileSettings from '@/pages/Settings/Profile/ProfileSettings'
import ChangePassword from '@/pages/Settings/ChangePassword/ChangePassword'
import TermsSettings from '@/pages/Settings/Terms/TermsSettings'
import PrivacySettings from '@/pages/Settings/Privacy/PrivacySettings'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* User Management */}
          <Route path="users" element={<UserList />} />
          <Route path="users/:id" element={<UserDetails />} />
          
          {/* Product Management */}
          <Route path="products" element={<ProductList />} />
          
          {/* Category Management */}
          <Route path="categories" element={<CategoryList />} />
          
          {/* Settings */}
          <Route path="settings">
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="password" element={<ChangePassword />} />
            <Route path="terms" element={<TermsSettings />} />
            <Route path="privacy" element={<PrivacySettings />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App

