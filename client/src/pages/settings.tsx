import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, User, Building, Palette, Bell, Shield, Download, Trash2 } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Business Information
    businessName: "Your Business Name",
    businessEmail: "contact@yourbusiness.com",
    businessPhone: "+1 (555) 123-4567",
    businessAddress: "123 Business St\nYour City, State 12345",
    businessWebsite: "www.yourbusiness.com",
    
    // Invoice Settings
    defaultCurrency: "USD",
    defaultTaxRate: "10",
    defaultPaymentTerms: "Net 30",
    invoicePrefix: "INV",
    nextInvoiceNumber: "1001",
    
    // Appearance
    primaryColor: "#6366f1",
    darkMode: false,
    
    // Notifications
    emailNotifications: true,
    browserNotifications: false,
    
    // Privacy
    dataExport: false,
    accountDeletion: false,
  });

  const handleSave = () => {
    // Save settings logic would go here
    console.log("Saving settings:", settings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1">Customize your InvoiceFlow experience and business information.</p>
        </div>

        {/* Business Information */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building size={20} />
              <span>Business Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={settings.businessName}
                  onChange={(e) => setSettings({...settings, businessName: e.target.value})}
                  className="bg-white/80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessEmail">Business Email</Label>
                <Input
                  id="businessEmail"
                  type="email"
                  value={settings.businessEmail}
                  onChange={(e) => setSettings({...settings, businessEmail: e.target.value})}
                  className="bg-white/80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessPhone">Business Phone</Label>
                <Input
                  id="businessPhone"
                  value={settings.businessPhone}
                  onChange={(e) => setSettings({...settings, businessPhone: e.target.value})}
                  className="bg-white/80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessWebsite">Website</Label>
                <Input
                  id="businessWebsite"
                  value={settings.businessWebsite}
                  onChange={(e) => setSettings({...settings, businessWebsite: e.target.value})}
                  className="bg-white/80"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business Address</Label>
              <Textarea
                id="businessAddress"
                value={settings.businessAddress}
                onChange={(e) => setSettings({...settings, businessAddress: e.target.value})}
                className="bg-white/80"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Invoice Settings */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings size={20} />
              <span>Invoice Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="defaultCurrency">Default Currency</Label>
                <Select value={settings.defaultCurrency} onValueChange={(value) => setSettings({...settings, defaultCurrency: value})}>
                  <SelectTrigger className="bg-white/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                    <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultTaxRate">Default Tax Rate (%)</Label>
                <Input
                  id="defaultTaxRate"
                  type="number"
                  value={settings.defaultTaxRate}
                  onChange={(e) => setSettings({...settings, defaultTaxRate: e.target.value})}
                  className="bg-white/80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultPaymentTerms">Default Payment Terms</Label>
                <Select value={settings.defaultPaymentTerms} onValueChange={(value) => setSettings({...settings, defaultPaymentTerms: value})}>
                  <SelectTrigger className="bg-white/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Due on receipt">Due on receipt</SelectItem>
                    <SelectItem value="Net 15">Net 15</SelectItem>
                    <SelectItem value="Net 30">Net 30</SelectItem>
                    <SelectItem value="Net 60">Net 60</SelectItem>
                    <SelectItem value="Net 90">Net 90</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="invoicePrefix">Invoice Number Prefix</Label>
                <Input
                  id="invoicePrefix"
                  value={settings.invoicePrefix}
                  onChange={(e) => setSettings({...settings, invoicePrefix: e.target.value})}
                  className="bg-white/80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nextInvoiceNumber">Next Invoice Number</Label>
                <Input
                  id="nextInvoiceNumber"
                  type="number"
                  value={settings.nextInvoiceNumber}
                  onChange={(e) => setSettings({...settings, nextInvoiceNumber: e.target.value})}
                  className="bg-white/80"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette size={20} />
              <span>Appearance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center space-x-3">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                    className="w-20 h-10 bg-white/80"
                  />
                  <Input
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                    className="bg-white/80"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-slate-600">Use dark theme for the interface</p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => setSettings({...settings, darkMode: checked})}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell size={20} />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-slate-600">Receive email notifications for important events</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Browser Notifications</Label>
                  <p className="text-sm text-slate-600">Show notifications in your browser</p>
                </div>
                <Switch
                  checked={settings.browserNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, browserNotifications: checked})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Data */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield size={20} />
              <span>Privacy & Data</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Export Data</Label>
                  <p className="text-sm text-slate-600">Download all your data in JSON format</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-red-600">Delete Account</Label>
                  <p className="text-sm text-slate-600">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}