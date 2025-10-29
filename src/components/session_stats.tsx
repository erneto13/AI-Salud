import type { LucideIcon } from "lucide-react";

interface SessionStatProps {
    label: string;
    icon: LucideIcon;
    value: string | number;
}

export default function SessionStat({ label, icon: Icon, value }: SessionStatProps) {
    return (
        <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    {label}
                </span>
                <Icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-semibold text-foreground tabular-nums">
                {value}
            </p>
        </div>
    );
}
