import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
    title: string;
    IconCard: LucideIcon;
    amount: number;
    footer: string;
}

function formatNumber(num: number): string {
    return num.toLocaleString('en-US');
  }

export default function DashboardCard({ title, IconCard, amount, footer }: DashboardCardProps) {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle> 
                <IconCard className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatNumber(amount)} €</div>
                <p className="text-xs text-muted-foreground">
                    {footer}
                </p>
            </CardContent>
        </Card>
    )
}
