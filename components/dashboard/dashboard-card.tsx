import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
    title: string;
    IconCard: LucideIcon;
    amount: number;
    footer: string;
    devise?: string;
}

function formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // return num.toLocaleString('en-US');
}

export default function DashboardCard({ title, IconCard, amount, footer, devise }: DashboardCardProps) {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <IconCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{amount > 0 ? "+" : null}{amount && formatNumber(amount)} {devise ? devise : null}</div>
                <p className="text-xs text-muted-foreground">
                    {footer}
                </p>
            </CardContent>
        </Card>
    )}
