import React, { useState } from 'react';
import styled from 'styled-components';
import { User, Bell, Shield, Globe, Palette } from 'lucide-react';
import { Container, Card, Text, Input, Button, Switch, theme } from '../styles/styled';

const SettingsContainer = styled.div`
  padding: 2rem 0;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const SettingsSidebar = styled(Card)`
  height: fit-content;
`;

const SidebarNav = styled.nav``;

const NavItem = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${props => props.active ? theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : theme.colors.textSecondary};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0.5rem;

  &:hover {
    background: ${props => props.active ? theme.colors.primary : theme.colors.surfaceHover};
    color: ${props => props.active ? 'white' : theme.colors.text};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const SettingsContent = styled.div`
  display: grid;
  gap: 2rem;
`;

const SettingsSection = styled(Card)``;

const SectionHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
`;

const SectionDescription = styled.div`
  color: ${theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 500;
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const SwitchGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const SwitchLabel = styled.div``;

const SwitchTitle = styled.div`
  font-weight: 500;
  color: ${theme.colors.text};
  margin-bottom: 0.25rem;
`;

const SwitchDescription = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.textSecondary};
`;

const settingsNavItems = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'regional', label: 'Regional Settings', icon: Globe },
  { id: 'preferences', label: 'Preferences', icon: Palette },
];

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    darkMode: true,
    compactView: true,
    emailNotifications: true,
    pushNotifications: false,
    marketAlerts: true,
    newsUpdates: true,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSwitchChange = (field: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const renderAccountSettings = () => (
    <SettingsSection>
      <SectionHeader>
        <SectionTitle>Account Settings</SectionTitle>
        <SectionDescription>Manage your personal information and account details</SectionDescription>
      </SectionHeader>

      <Text weight="semibold" style={{ marginBottom: '1rem' }}>Personal Information</Text>
      
      <FormRow>
        <FormGroup>
          <FormLabel>First Name</FormLabel>
          <Input
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Last Name</FormLabel>
          <Input
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
          />
        </FormGroup>
      </FormRow>

      <FormGroup>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Phone</FormLabel>
        <Input
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />
      </FormGroup>

      <Button variant="primary">Save Changes</Button>
    </SettingsSection>
  );

  const renderNotificationSettings = () => (
    <SettingsSection>
      <SectionHeader>
        <SectionTitle>Notifications</SectionTitle>
        <SectionDescription>Configure how you receive updates and alerts</SectionDescription>
      </SectionHeader>

      <SwitchGroup>
        <SwitchLabel>
          <SwitchTitle>Email Notifications</SwitchTitle>
          <SwitchDescription>Receive portfolio updates and market news via email</SwitchDescription>
        </SwitchLabel>
        <Switch checked={formData.emailNotifications}>
          <input
            type="checkbox"
            checked={formData.emailNotifications}
            onChange={(e) => handleSwitchChange('emailNotifications', e.target.checked)}
          />
          <span className="slider"></span>
        </Switch>
      </SwitchGroup>

      <SwitchGroup>
        <SwitchLabel>
          <SwitchTitle>Push Notifications</SwitchTitle>
          <SwitchDescription>Get instant alerts for price changes and market events</SwitchDescription>
        </SwitchLabel>
        <Switch checked={formData.pushNotifications}>
          <input
            type="checkbox"
            checked={formData.pushNotifications}
            onChange={(e) => handleSwitchChange('pushNotifications', e.target.checked)}
          />
          <span className="slider"></span>
        </Switch>
      </SwitchGroup>

      <SwitchGroup>
        <SwitchLabel>
          <SwitchTitle>Market Alerts</SwitchTitle>
          <SwitchDescription>Notifications for significant market movements</SwitchDescription>
        </SwitchLabel>
        <Switch checked={formData.marketAlerts}>
          <input
            type="checkbox"
            checked={formData.marketAlerts}
            onChange={(e) => handleSwitchChange('marketAlerts', e.target.checked)}
          />
          <span className="slider"></span>
        </Switch>
      </SwitchGroup>

      <SwitchGroup>
        <SwitchLabel>
          <SwitchTitle>News Updates</SwitchTitle>
          <SwitchDescription>Breaking news and market analysis notifications</SwitchDescription>
        </SwitchLabel>
        <Switch checked={formData.newsUpdates}>
          <input
            type="checkbox"
            checked={formData.newsUpdates}
            onChange={(e) => handleSwitchChange('newsUpdates', e.target.checked)}
          />
          <span className="slider"></span>
        </Switch>
      </SwitchGroup>
    </SettingsSection>
  );

  const renderPreferences = () => (
    <SettingsSection>
      <SectionHeader>
        <SectionTitle>Display Settings</SectionTitle>
        <SectionDescription>Customize the appearance and layout of your dashboard</SectionDescription>
      </SectionHeader>

      <SwitchGroup>
        <SwitchLabel>
          <SwitchTitle>Dark Mode</SwitchTitle>
          <SwitchDescription>Switch between light and dark theme</SwitchDescription>
        </SwitchLabel>
        <Switch checked={formData.darkMode}>
          <input
            type="checkbox"
            checked={formData.darkMode}
            onChange={(e) => handleSwitchChange('darkMode', e.target.checked)}
          />
          <span className="slider"></span>
        </Switch>
      </SwitchGroup>

      <SwitchGroup>
        <SwitchLabel>
          <SwitchTitle>Compact View</SwitchTitle>
          <SwitchDescription>Show more data with less spacing</SwitchDescription>
        </SwitchLabel>
        <Switch checked={formData.compactView}>
          <input
            type="checkbox"
            checked={formData.compactView}
            onChange={(e) => handleSwitchChange('compactView', e.target.checked)}
          />
          <span className="slider"></span>
        </Switch>
      </SwitchGroup>

      <Button variant="primary">Save Preferences</Button>
    </SettingsSection>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return renderAccountSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'preferences':
        return renderPreferences();
      default:
        return renderAccountSettings();
    }
  };

  return (
    <SettingsContainer>
      <Container>
        <Text size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>Settings</Text>

        <SettingsGrid>
          <SettingsSidebar>
            <SidebarNav>
              {settingsNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavItem
                    key={item.id}
                    active={activeSection === item.id}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavItem>
                );
              })}
            </SidebarNav>
          </SettingsSidebar>

          <SettingsContent>
            {renderContent()}
          </SettingsContent>
        </SettingsGrid>
      </Container>
    </SettingsContainer>
  );
};
