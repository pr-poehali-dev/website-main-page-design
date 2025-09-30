import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface DomainSectionProps {
  domain: string;
  setDomain: (value: string) => void;
  domainConnected: boolean;
  dnsRecords: Array<{name: string, value: string}>;
  onAddDnsRecord: () => void;
  onRemoveDnsRecord: (index: number) => void;
  onUpdateDnsRecord: (index: number, field: 'name' | 'value', value: string) => void;
  loading: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onSave: () => void;
}

const DomainSection = ({
  domain,
  setDomain,
  domainConnected,
  dnsRecords,
  onAddDnsRecord,
  onRemoveDnsRecord,
  onUpdateDnsRecord,
  loading,
  collapsed,
  onToggle,
  onSave
}: DomainSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader 
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center gap-2">
          <Icon name={collapsed ? "ChevronRight" : "ChevronDown"} size={20} />
          Отдельный домен
        </CardTitle>
      </CardHeader>
      {!collapsed && (
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="domain">Отдельный домен</Label>
            <Input
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
            />
            {domainConnected && (
              <p className="text-green-600 text-sm mt-1">✓ подключен</p>
            )}
          </div>
          <div>
            <Label>DNS-записи</Label>
            <div className="space-y-2 mt-2">
              {dnsRecords.map((record, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    placeholder="Название"
                    value={record.name}
                    onChange={(e) => onUpdateDnsRecord(index, 'name', e.target.value)}
                    className="w-32"
                  />
                  <Input
                    placeholder="Значение"
                    value={record.value}
                    onChange={(e) => onUpdateDnsRecord(index, 'value', e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveDnsRecord(index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={onAddDnsRecord}>
                Добавить запись
              </Button>
            </div>
          </div>
          <Button onClick={onSave} disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default DomainSection;