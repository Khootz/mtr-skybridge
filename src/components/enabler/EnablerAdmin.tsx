import { mockOperators } from '@/data/mockData';
import { Users, FileText, Shield, Clock, ChevronRight, Plus, Search, UserCog, History } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const OnboardingChecklist = () => {
  const steps = [
    { label: 'Company registration', complete: true },
    { label: 'Insurance documents', complete: true },
    { label: 'Aircraft certification', complete: true },
    { label: 'Pilot licenses', complete: false },
    { label: 'Safety compliance review', complete: false },
  ];

  return (
    <div className="card-elevated p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Operator Onboarding</h3>
        <Badge variant="outline">3/5 complete</Badge>
      </div>
      <div className="space-y-2">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-3 p-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
              step.complete ? 'bg-success text-success-foreground' : 'bg-muted border-2 border-muted-foreground'
            }`}>
              {step.complete && <span className="text-xs">✓</span>}
            </div>
            <span className={`text-sm ${step.complete ? 'text-foreground' : 'text-muted-foreground'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
      <Button className="w-full mt-3" variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        Add New Operator
      </Button>
    </div>
  );
};

const RoleManagement = () => {
  const roles = [
    { name: 'Government Officials', count: 12, icon: Shield },
    { name: 'Operators', count: 4, icon: Users },
    { name: 'Investors', count: 8, icon: FileText },
  ];

  return (
    <div className="card-elevated p-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <UserCog className="h-4 w-4 text-primary" />
        Role Management
      </h3>
      <div className="space-y-2">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button key={role.name} className="w-full flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{role.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{role.count}</Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const AuditLog = () => {
  const logs = [
    { action: 'Operator SkyLink approved', user: 'Admin', time: '2 hours ago' },
    { action: 'Flight FL003 route modified', user: 'System', time: '4 hours ago' },
    { action: 'New incident reported', user: 'Control', time: '6 hours ago' },
    { action: 'Infrastructure status updated', user: 'System', time: '8 hours ago' },
  ];

  return (
    <div className="card-elevated p-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <History className="h-4 w-4 text-primary" />
        Audit Log
      </h3>
      <div className="space-y-2">
        {logs.map((log, idx) => (
          <div key={idx} className="flex items-start justify-between p-2 border-b border-border last:border-0">
            <div>
              <p className="text-sm font-medium">{log.action}</p>
              <p className="text-xs text-muted-foreground">by {log.user}</p>
            </div>
            <span className="text-xs text-muted-foreground">{log.time}</span>
          </div>
        ))}
      </div>
      <button className="w-full text-center text-sm text-primary font-medium mt-3 py-2">
        View Full Log
      </button>
    </div>
  );
};

const PendingOperators = () => {
  const pending = mockOperators.filter(o => o.status === 'pending');

  return (
    <div className="card-elevated p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 text-warning" />
          Pending Approvals
        </h3>
        <Badge className="bg-warning/10 text-warning">{pending.length}</Badge>
      </div>
      {pending.map((operator) => (
        <div key={operator.id} className="flex items-center justify-between p-3 bg-warning/5 rounded-lg border border-warning/20">
          <div>
            <p className="font-medium">{operator.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{operator.type.replace('-', ' ')} • {operator.fleetSize} aircraft</p>
          </div>
          <Button size="sm" className="cta-button">Review</Button>
        </div>
      ))}
    </div>
  );
};

export const EnablerAdmin = () => {
  return (
    <div className="px-4 py-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-foreground mb-1">Administration</h2>
        <p className="text-sm text-muted-foreground">Manage operators, roles & compliance</p>
      </div>

      {/* Search */}
      <div className="card-elevated p-3 flex items-center gap-3 mb-4">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search operators, users, logs..."
          className="flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      {/* Pending Operators */}
      <div className="mb-4">
        <PendingOperators />
      </div>

      {/* Onboarding Checklist */}
      <div className="mb-4">
        <OnboardingChecklist />
      </div>

      {/* Role Management */}
      <div className="mb-4">
        <RoleManagement />
      </div>

      {/* Audit Log */}
      <AuditLog />
    </div>
  );
};
